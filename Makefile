SH_FILES:=script/hooks/common.sh script/hooks/pre-commit script/hooks/pre-push

MAYBE:=node script/maybe-run.js
PRETTIER:=npx prettier \
	**/*.{css,js,json,pug,yaml} \
	--plugin @prettier/plugin-pug

SHELLCHECK_OPTS:='--enable=avoid-nullary-conditions --enable=deprecate-which --enable=quote-safe-variables --enable=require-variable-braces'

# --- COMMANDS --------------------------------------------------------------- #

.PHONY: default
default: help

.PHONY: audit
audit: node_modules/ ## Check for security warnings in third-party dependencies
	@npm audit
	@npx depreman --errors-only --report-unused

.PHONY: build
build: _site/ ## Build of the website

.PHONY: check
check: check-ci check-csp check-formatting check-licenses check-md check-sh check-yaml ## Run check-*

.PHONY: check-ci
check-ci: node_modules/ ## Check GitHub Actions workflows
	@SHELLCHECK_OPTS=$(SHELLCHECK_OPTS) \
		$(MAYBE) actionlint

.PHONY: check-csp
check-csp: node_modules/ ## Check the Content Security Policy (csp)
	@node script/csp_evaluator-cli.js \
		./data/csp.txt

.PHONY: check-formatting
check-formatting: node_modules/ ## Check the source code formatting
	@$(PRETTIER) --check
	@$(MAYBE) shfmt --diff $(SH_FILES)

.PHONY: check-licenses
check-licenses: node_modules/ ## Check the third-party dependency licenses
	@npx licensee \
		--errors-only

.PHONY: check-md
check-md: node_modules/ ## Check MarkDown files
	@npx markdownlint \
		--dot \
		--ignore-path .gitignore \
		.

.PHONY: check-sh
check-sh: node_modules/ ## Check Shell scripts
	@SHELLCHECK_OPTS=$(SHELLCHECK_OPTS) \
		$(MAYBE) shellcheck \
		$(SH_FILES)

.PHONY: check-yaml
check-yaml: node_modules/ ## Check YAML files
	@$(MAYBE) yamllint \
		--config-file .yamllint.yaml \
		.

.PHONY: clean
clean: ## Clean the repository
	@git clean -fx \
		_site/ \
		node_modules/ \
		data/*.json \
		script/hooks/_/ \
		www/*.html

.PHONY: format
format: node_modules/ ## Format the source code
	@$(PRETTIER) --write
	@$(MAYBE) shfmt --simplify --write $(SH_FILES)

.PHONY: help
help: ## Show this help message
	@printf "Usage: make <command>\n\n"
	@printf "Commands:\n"
	@awk -F ':(.*)## ' '/^[a-zA-Z0-9%\\\/_.-]+:(.*)##/ { \
		printf "  \033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)

.PHONY: serve
serve: build ## Spawn a development server
	@npx http-server \
		-p 8080 \
		-a localhost \
		-o / \
		_site/

.PHONY: verify
verify: build check ## Verify project is in a good state

# --- FILES ------------------------------------------------------------------ #

node_modules/: .npmrc .nvmrc package*.json
	@npm clean-install \
		--no-audit

data/%.json: data/%.yaml  node_modules/
	@$(foreach \
		file, \
		$(filter %.yaml,$+), \
		npx js-yaml -- $(file) > $(subst yaml,json,$(file)); \
	)

www/%.html: www/%.pug  node_modules/ data/*.json data/csp.txt script/pug-cli.js
	@$(foreach \
		file, \
		$(filter %.pug,$+), \
		node script/pug-cli.js $(file) > $(subst pug,html,$(file)); \
	)

_site/: www/*.html www/.well-known/*.txt www/styles/*.css
	@mkdir -p _site
	@mkdir -p _site/.well-known
	@mkdir -p _site/styles
	@touch _site/.nojekyll
	@cp www/CNAME _site/
	@cp www/robots.txt _site/
	@cp www/*.html _site/
	@cp www/.well-known/*.txt _site/.well-known/
	@cp www/styles/*.css _site/styles/

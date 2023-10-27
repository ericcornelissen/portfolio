SH_FILES:=script/hooks/common.sh script/hooks/pre-commit script/hooks/pre-push

MAYBE:=node script/maybe-run.js
PRETTIER:=npx prettier \
	**/*.{css,js,json,pug,yaml} \
	--plugin @prettier/plugin-pug

# --- COMMANDS --------------------------------------------------------------- #

.PHONY: default
default: help

.PHONY: audit
audit: node_modules/ ## Check for vulnerabilities in third-party dependencies
	@npm audit

.PHONY: build
build: _site/ ## Build of the website

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

.PHONY: check-formatting
format-check: node_modules/ ## Check the source code formatting
	@$(PRETTIER) --check
	@$(MAYBE) shfmt --diff $(SH_FILES)

.PHONY: check-licenses
license-check: node_modules/ ## Check the third-party dependency licenses
	@npx licensee \
		--errors-only

.PHONY: lint
lint: lint-ci lint-md lint-sh lint-yaml ## Run lint-*

.PHONY: lint-ci
lint-ci: node_modules/ ## Lint GitHub Actions workflows
	@$(MAYBE) actionlint

.PHONY: lint-md
lint-md: node_modules/ ## Lint MarkDown files
	@npx markdownlint \
		--dot \
		--ignore-path .gitignore \
		.

.PHONY: lint-sh
lint-sh: node_modules/ ## Lint Shell scripts
	@$(MAYBE) shellcheck \
		script/hooks/*.sh

.PHONY: lint-yaml
lint-yaml: node_modules/ ## Lint YAML files
	@$(MAYBE) yamllint \
		--config-file .yamllint.yaml \
		.

.PHONY: help
help: ## Show this help message
	@printf "Usage: make <command>\n\n"
	@printf "Commands:\n"
	@awk -F ':(.*)## ' '/^[a-zA-Z0-9%\\\/_.-]+:(.*)##/ { \
		printf "  \033[36m%-30s\033[0m %s\n", $$1, $$NF \
	}' $(MAKEFILE_LIST)

.PHONY: serve
serve: build ## Spawn a development server
	@npx anywhere \
		-p 8080 \
		-h localhost \
		-d _site/

.PHONY: verify
verify: build format-check license-check lint ## Verify project is in a good state

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

www/%.html: www/%.pug  node_modules/ data/*.json script/pug-cli.js
	@$(foreach \
		file, \
		$(filter %.pug,$+), \
		node script/pug-cli.js $(file) > $(subst pug,html,$(file)); \
	)

_site/: www/*.html www/styles/*.css
	@mkdir -p _site
	@mkdir -p _site/styles
	@cp www/CNAME _site/
	@cp www/robots.txt _site/
	@cp www/*.html _site/
	@cp www/styles/*.css _site/styles/

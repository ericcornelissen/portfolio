# Portfolio
Repository for the personal portfolio of Eric Cornelissen.

### Build tools
| Functionality | Tool |
|---|---|
| Accessibility tester | [aXe](https://www.axe-core.org/) |
| Automatic reloading | [browser-sync](https://browsersync.io/) |
| Build tool | [Gulp](https://gulpjs.com/) |
| CSS preprocessor | [PostCSS](https://postcss.org/) |
| HTML linter | [htmllint](http://htmllint.github.io/) |
| JavaScript linter | [JSHint](https://jshint.com/) |
| JSON linter | [jsonlint](https://github.com/zaach/jsonlint) |
| Performance evaluator | [Lighthouse](https://github.com/GoogleChrome/lighthouse) |
| Site generator | [Handlebars.js](https://handlebarsjs.com/builtin_helpers.html) |
| Stylesheet linter | [stylelint](https://stylelint.io/) |
| Test runner | [Jest](https://jestjs.io/) |

###### How to use the build tools
- `$ gulp`: Build the site, watch for changes, and start a simple HTTP server (on port 4000) serving the site with live reload.
- `$ gulp analyze:a11y`: Test the website for accessibility issues.
  - Result can be found in `./_reports`.
- `$ gulp analyze:perf`: Do a performance check on the sites landing page.
  - Result can be found in `./_reports`.
- `$ gulp build`: Build the project once.
- `$ gulp build:watch`: Build the project and watch for changes.
- `$ gulp clean`: Clean the project, removing all generated files.
- `$ gulp dist`: Build the project for distributing purposes.
- `$ gulp lint`: Lint the source code of the project.
- `$ gulp server`: Start a simple HTTP server (on port 4000) serving the site.
  - Requires `$ gulp build` or `$ gulp dist`.
- `$ gulp test`: Run the test suites of the project.

### Docker
To serve the portfolio from a [Docker](https://www.docker.com/) image run:

```bash
# Build the docker image to run the portfolio
$ docker build -t portfolio-eric .

# Run the docker image as a container to start a web server
$ docker run -p 4000:4000 -d portfolio-eric
```

To check the log of the web server.

```bash
# Find the image using
$ docker ps
CONTAINER ID   IMAGE            COMMAND   CREATED   STATUS   PORTS        NAMES
[ID]           portfolio-eric   ...       ...       ...      4000->4000   ...
...

# Copy the value [ID] under "CONTAINER ID"
$ docker logs [ID]
```

To remove the container or image

```bash
# To remove the docker container for the portfolio run
$ docker ps -a
CONTAINER ID   IMAGE            COMMAND   CREATED   STATUS   PORTS        NAMES
[ID]           portfolio-eric   ...       ...       ...      4000->4000   ...
...

$ docker rm [ID]
[ID]

# To remove the docker image run
$ docker image rm portfolio-eric
```

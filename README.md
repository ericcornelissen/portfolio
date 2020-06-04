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
# Build the Docker image to run the portfolio
$ docker build -t portfolio-eric .

# Run the Docker image as a container to start a web server
$ docker run -d --rm -p 4000:4000 --name portfolio-server portfolio-eric

# Check the server logs
$ docker logs portfolio-server

# To stop the web server (and delete the container)
$ docker stop portfolio-server
```

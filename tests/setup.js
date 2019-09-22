const mkdir = require('make-dir');

const { ARTIFACTS } = require('./utils.js');


// Make sure the artifacts directory exists
mkdir.sync(ARTIFACTS);

const mkdir = require('make-dir');

const { ARTIFACTS_PATH } = require('./utils.js');


// Make sure the artifacts directory exists
mkdir.sync(ARTIFACTS_PATH);

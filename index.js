// Used to detect for Cygwin
var os = require('os');

// Required for Windows/Cygwin support
var root = [__dirname, '/vendor/libgit2/build/shared'].join(''),
    path = process.env.PATH;

if (~os.type().indexOf('CYGWIN') && !~path.indexOf(root)) {
  process.env.PATH = root + ':' + path;
}

// Assign raw api to module
var rawApi;
try {
  rawApi = require('./build/Release/nodegit');
} catch (e) {
  rawApi = require('./build/Debug/nodegit');
}

// Set the exports prototype to the raw API.
exports.__proto__ = rawApi;

// Import extensions
require('./lib/commit.js');
require('./lib/blob.js');
require('./lib/object.js');
require('./lib/signature.js');
require('./lib/odb.js');
require('./lib/oid.js');
require('./lib/index.js');
require('./lib/repository.js');
require('./lib/reference.js');
require('./lib/revwalk.js');
//require('./lib/tree.js');

// Set version
exports.version = require('./package').version;

// Initialize threads
//exports.Threads.init();

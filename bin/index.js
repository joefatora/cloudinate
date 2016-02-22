#!/usr/bin/env node

var argv = require('yargs');
var cloudinate = require('../lib/index.js');
var path = require('path');

// Parse arguments
argv = argv
  .command('cloudinate', 'Batch upload files to Cloudinary')
  .alias('k', 'keys')
  .describe('k', 'Location of api keys')
  .demand('k')
  .alias('f', 'files')
  .describe('f', 'Files to upload')
  .demand('f')
  .alias('r', 'relative')
  .describe('r', 'Generate public ids relative to this path')
  .help('h')
  .alias('h', 'help')
  .argv;

// Process arguments
var opts = {
  files: argv.files,
  keys: require(path.join(process.cwd(), argv.keys)),
  relativeTo: argv.relative || ''
};

// Run module with supplied options
cloudinate(opts);

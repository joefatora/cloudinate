var cloudinary = require('cloudinary');
var debug = require('debug')('cloudinate');
var glob = require('glob');
var path = require('path');

/**
 * Cloudinate
 *
 * Uploads all selected files to cloudinary. Sets the file path and name as the
 * public id.
 *
 * @param {Object} options
 *   @property {String} files
 *   @property {Object} keys
 *     @property {String} cloud_name
 *     @property {String} api_key
 *     @property {String} api_secret
 *   @property {String} relativeTo (optional)
 * @return {Object} results
 */

module.exports = function cloudinate(opts) {
  opts = opts || {};

  // Make sure required options are available
  if (!opts.files) throw new Error('"files" option required');
  if (!opts.keys) throw new Error('"keys" option required');

  // Map to local variables
  var filesGlob = opts.files;
  var keys = opts.keys;
  var relativeTo = opts.relativeTo;

  function uploadFiles(err, files) {
    if (err) throw new Error(err);
    if (files.length == 0) {
      debug('no matches found for: %s', filesGlob);
      return {};
    }

    // Set credentials
    debug('authenticating');
    cloudinary.config(keys);

    // Upload each file
    files.forEach(function(file) {
      debug('uploading: %s', file);
      var fileData = path.parse(file);
      var publicId = path.join(fileData.dir, fileData.name);
      var removeHashID = publicId.split('/')[0] + '/' + publicId.split('/')[2];

      // Set publicId to relative path if relativeTo was set
      if (relativeTo) {
        publicId = path.relative(relativeTo, removeHashID);
      }

      var params = { public_id: removeHashID };

      // Log and return the results
      function done(result) {
        debug('result: %s', result);
        return result;
      }

      cloudinary.uploader.upload(file, done, params);
    });
  };

  // Match files to pattern and pass to uploadFiles
  glob(filesGlob, uploadFiles);
};

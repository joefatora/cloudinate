var cloudinary = require('cloudinary');
var glob = require('glob');
var path = require('path');

/**
 * Cloudinate
 *
 * Uploads all selected files to cloudinary. Sets the file path and name as the
 * public id
 *
 * @param {Object} options
 *   @property {String} files
 *   @property {Object} keys
 *     @property {String} cloud_name
 *     @property {String} api_key
 *     @property {String} api_secret
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

  function uploadFiles(err, files) {
    if (err) throw new Error(err);
    if (files.length == 0) {
      console.log(`No matches found for '${filesGlob}'`);
      return {};
    }

    // Set credentials
    cloudinary.config(keys);

    // Upload each file
    files.forEach(function(file) {
      var fileData = path.parse(file);
      var fileName = path.join(fileData.dir, fileData.name);
      var params = { public_id: fileName };

      // Log and return the results
      function done(result) {
        console.log(result);
        return result;
      }

      cloudinary.uploader.upload(file, done, params);
    });
  };

  // Match files to pattern and pass to uploadFiles
  glob(filesGlob, uploadFiles);
};

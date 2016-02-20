# cloudinate

[![npm version][version-badge]][version-url]
[![dependency status][dependency-badge]][dependency-url]
[![devdependency status][devdependency-badge]][devdependency-url]
[![downloads][downloads-badge]][downloads-url]

> Batch upload files to Cloudinary

Cloudinate automates uploading files to [Cloudinary](http://cloudinary.com/). It accepts a [glob](https://github.com/isaacs/node-glob) pattern and uploads all files that match the pattern to Cloudinary. Cloudinate is meant to simplify the uploading of assets for the [metalsmith-cloudinary](https://github.com/superwolff/metalsmith-cloudinary) plugin, but can of course be used for other purposes as well.

## Installation

```
$ npm install cloudinate
```

Cloudinate can also be installed globally with `npm install cloudinate -g`

## Usage

#### local install

If you've installed cloudinate locally you could use a script `upload.js`:

```javascript
var cloudinate = require('cloudinate');

// Settings
var keys = require('./keys')

cloudinate({
  keys: keys,
  files: './images/*.jpg'
});
```

Where `keys.js` is a module that exports your api keys like so:

```javascript
// Ignore this with your .gitignore
module.exports = {
  'cloud_name': 'your_cloud_name_here',
  'api_key': 'your_api_key_here',
  'api_secret': 'your_api_secret_here'
}
```

Run the above script with `node upload.js`.

#### global install

Or if you've installed cloudinate globally, you can run it from the command line like so:

```
$ cloudinate -k 'keys.js' -f 'images/**/*.jpg'
```


## What does it do

Cloudinate will upload the files that match the supplied pattern. Uploaded files will be given a `public_id` according to their relative path and name, to make subsequent retrieval easier.

For example, successfully uploading `images/1.jpg` would result in output that resembles:

```javascript
{
  public_id: 'images/1',
  version: {version number here},
  signature: {signature number here},
  width: 7200,
  height: 10800,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2016-02-20T12:44:44Z',
  tags: [],
  bytes: 3008861,
  type: 'upload',
  etag: {etag number here},
  url: 'http://res.cloudinary.com/{cloud_name_here}/image/upload/v{version_number_here}/images/1.jpg',
  secure_url: 'https://res.cloudinary.com/{cloud_name_here}/image/upload/v{version_number_here}/images/1.jpg',
  original_filename: '1'
}
```

## License

MIT

[dependency-badge]: https://david-dm.org/superwolff/cloudinate.svg
[dependency-url]: https://david-dm.org/superwolff/cloudinate
[devdependency-badge]: https://david-dm.org/superwolff/cloudinate/dev-status.svg
[devdependency-url]: https://david-dm.org/superwolff/cloudinate#info=devDependencies
[downloads-badge]: https://img.shields.io/npm/dm/cloudinate.svg
[downloads-url]: https://www.npmjs.com/package/cloudinate
[version-badge]: https://img.shields.io/npm/v/cloudinate.svg
[version-url]: https://www.npmjs.com/package/cloudinate

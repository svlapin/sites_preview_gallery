'use strict';

exports.tempFile = tempFile;
/**
 * Generates random filename image_0 ... image_9999
 * @return {String} random filename
 */
function tempFile(root) {
  return 'image_' +
    Math.floor(Math.random() * 10000) + '.png';
}

const fsExtra  = require('fs-extra');
const path = require('path');
const download = require('download');
const decompress = require('decompress');

const API_URL = 'https://coronadashboard.rijksoverheid.nl/json/latest-data.zip';

console.log(`Downloading json data from this location: ${API_URL}`);

const filename = 'latest-data.zip';
const dataPath = path.join('.', 'data');
fsExtra.emptyDirSync(dataPath);
const zipPath = path.join(dataPath, filename);
const jsonPath = path.join(dataPath, "jsons");

const downloadLatestData = async () => {
  await download(API_URL, dataPath, {
    filename: filename,
  });

  await decompress(zipPath, jsonPath, {
    strip: 1,
  });
};

module.exports = { downloadLatestData, jsonPath };

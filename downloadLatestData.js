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

const latestDataJsons = {};

const downloadLatestData = async () => {
  await download(API_URL, dataPath, {
    filename: filename,
  });

  await decompress(zipPath, jsonPath, {
    strip: 1,
  });

  console.log("Parse JSONs")
  // read all json files
  fsExtra.readdir(jsonPath, (err, files) => {
    files.forEach(file => {
      // location of the json file
      const filePath = path.join(jsonPath, file);
      // parse file to json object
      const jsonObject = JSON.parse(fsExtra.readFileSync(filePath, 'utf8'));
      // get name of the file without extension
      const jsonName = path.parse(file).name;
      // set jsonObject in latestDataJsons
      latestDataJsons[jsonName] = jsonObject;
    });
  });
};

module.exports = { downloadLatestData, latestDataJsons };

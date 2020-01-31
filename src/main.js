const util = require('util');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const isAbsolute = (ruta) => {
  return path.isAbsolute(ruta) ? true : false;
}

const convertToAbsolute = (ruta) => {
  return path.resolve(ruta);
}

const isPathExists = (ruta) => {
  return fs.existsSync(ruta);
}

//1404

const typePath = (ruta) => {
  const stat = util.promisify(fs.stat);
  return stat(ruta);
}

const readDirectory = (ruta) => {
  const containDir = util.promisify(fs.readdir);
  return containDir(ruta);
}

const readFile = (ruta) => {
  const containFile = util.promisify(fs.readFile);
  return containFile(ruta, 'utf8');
}

const fileFormat = (ruta) => {
  return path.extname(ruta);
}

const getLinks = (data, urlFile) => {
  let arr = [];
  const lines = data.split('\n');
  const expReg = /(\b(http?|https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  lines.forEach(line => {
    let obj = {};
    let urls = line.match(expReg);
    if (urls) {
      obj.href = urls[0];
      obj.text = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
      obj.file = urlFile;
      arr.push(obj);
    }
  });
  return arr;
}

const validateLink = (link) => {
  return fetch(link);
}

const mainFunctions = {
  pathAbsolute: isAbsolute,
  convertToPathAbsolute: convertToAbsolute,
  pathExists: isPathExists,
  typePath: typePath,
  readContainDir: readDirectory,
  readContainFile: readFile,
  fileMd: fileFormat,
  validateLink: validateLink,
  getArrLinks: getLinks,
}

module.exports = mainFunctions;

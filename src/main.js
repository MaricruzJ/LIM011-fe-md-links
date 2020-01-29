const util = require('util');
const path = require('path');
const fs = require('fs');
const fetch = require("node-fetch");

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

const joinPath = (ruta, file) => {
  return path.join(ruta, file);
}

const getFilesMd = (path) => {
  const arrFilesMd = [];
  return typePath(path)
    .then(stats => {
      if (stats.isFile() && fileFormat(path) === '.md') {
        arrFilesMd.push(path);
      } else if (stats.isDirectory()) {
        return readDirectory(path)
          .then(data => {
            data.forEach((element) => {
              const newPath = joinPath(path, element);
              getFilesMd(newPath);
            })
          })
      }
      return arrFilesMd;
    })
}

getFilesMd('/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/README.md')
  .then(data => console.log(data))




const getLinks = (data) => {
  const html = md.render(data);
  const fragment = JSDOM.fragment(html);
  const abc = fragment.querySelectorAll('a');
  abc.forEach((element) => {
    console.log(element);
    console.log('array de objetos');
  })
}

const validateLink = (link) => {
  return fetch(link);
}

const mainFunctions = {
  isAbsolute: isAbsolute,
  convertToAbsolute: convertToAbsolute,
  isPathExists: isPathExists,
  typePath: typePath,
  readDirectory: readDirectory,
  readFile: readFile,
  fileFormat: fileFormat,
  validateLink: validateLink,
  getLinks: getLinks,
  joinPath: joinPath,
}

module.exports = mainFunctions;

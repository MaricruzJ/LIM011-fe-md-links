const util = require('util');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
            return data.map((element) => {
              return getFilesMd(joinPath(path, element));
            })
          })
          .then(promises => {
            return Promise.all(promises);
          })
          .then(rutas => {
           // console.log(rutas);
            let newArray = [];
            rutas.forEach(ruta => {
              console.count();
              //console.log(newArray); 
              newArray = newArray.concat(ruta);
              //console.log(newArray);              
            });
            return newArray;
          });
      }
      return arrFilesMd;
    })
}

/* getFilesMd('/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links/test')
  .then(data => console.log(data)) */

const getLinks = (data, path) => {
  var md = require('markdown-it')();
  const html = md.render(data);
  const fragment = JSDOM.fragment(html);
  const abc = fragment.querySelectorAll('a');
  abc.forEach((element) => {
    console.log(element.href);
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

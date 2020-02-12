const util = require('util');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const md = require('markdown-it')();
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const isAbsolute = (ruta) => path.isAbsolute(ruta);

const convertToAbsolute = (ruta) => path.resolve(ruta);

const isPathExists = (ruta) => fs.existsSync(ruta);

const typePath = (ruta) => {
  const stat = util.promisify(fs.stat);
  return stat(ruta);
};

const readDirectory = (ruta) => {
  const containDir = util.promisify(fs.readdir);
  return containDir(ruta);
};

const readFile = (ruta) => {
  const containFile = util.promisify(fs.readFile);
  return containFile(ruta, 'utf8');
};

const fileFormat = (ruta) => path.extname(ruta);

const joinPath = (ruta, file) => path.join(ruta, file);

const getFilesMd = (ruta) => {
  let arrFilesMd = [];
  return typePath(ruta)
    .then((stats) => {
      if (stats.isFile() && fileFormat(ruta) === '.md') {
        arrFilesMd.push(ruta);
      } else if (stats.isDirectory()) {
        return readDirectory(ruta)
          .then((data) => data.map((element) => getFilesMd(joinPath(ruta, element))))
          .then((promises) => Promise.all(promises))
          .then((values) => {
            values.forEach((value) => { arrFilesMd = arrFilesMd.concat(value); });
            return arrFilesMd;
          });
      }
      return arrFilesMd;
    });
};

const getLinksDetail = (data, ruta) => {
  const arr = [];
  const html = md.render(data);
  const fragment = JSDOM.fragment(html);
  const arrLinks = fragment.querySelectorAll('a');
  arrLinks.forEach((link) => {
    const obj = {
      href: link.href,
      text: link.textContent,
      file: ruta,
    };
    arr.push(obj);
  });
  return arr;
};

const validateLinks = (arrayOfObjects) => {
  const newArray = arrayOfObjects.map((object) => fetch(object.href)
    .then((response) => {
      object.status = response.status;
      if (response.status >= 200 && response.status < 300) {
        object.statusText = response.statusText;
      } else {
        object.statusText = 'fail';
      }
      return object;
    })
    .catch((error) => ({
      ...object,
      status: 400,
      statusText: error.message,
    }))); // también debería de devolver un objeto.
  return Promise.all(newArray);
};

const mainFunctions = {
  isAbsolute: isAbsolute,
  convertToAbsolute: convertToAbsolute,
  isPathExists: isPathExists,
  typePath: typePath,
  readDirectory: readDirectory,
  readFile: readFile,
  fileFormat: fileFormat,
  validateLinks: validateLinks,
  getLinksDetail: getLinksDetail,
  joinPath: joinPath,
  getFilesMd: getFilesMd,
};

module.exports = mainFunctions;

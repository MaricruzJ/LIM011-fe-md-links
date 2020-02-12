const functions = require('./main');

let arrayOfObjects = [];
let newPath = '';

const mdLinks = (path, options) => {
  if (functions.isAbsolute(path) !== true) {
    newPath = functions.convertToAbsolute(path);
  }
  if (functions.isPathExists(newPath)) {
    arrayOfObjects = functions.getFilesMd(newPath)
      .then((arrPathFile) => {
        const array = arrPathFile.map((pathFile) => functions.readFile(pathFile)
          .then((data) => functions.getLinksDetail(data, pathFile)));
        return Promise.all(array)
          .then((values) => {
            let arrayDetailLinks = [];
            values.forEach((value) => {
              arrayDetailLinks = arrayDetailLinks.concat(value);
            });
            if (options.validate === true) {
              return functions.validateLinks(arrayDetailLinks)
                .then((newValues) => newValues);
            }
            return arrayDetailLinks;
          });
      });
  } else { console.log('=> La ruta no existe'); } // crear una promesa que resuelva un string
  return arrayOfObjects;
};

module.exports = mdLinks;

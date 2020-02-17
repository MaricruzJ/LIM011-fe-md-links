const functions = require('./main');

let arrayOfObjects = [];

const mdLinks = (path, options) => {
  if (!functions.isAbsolute(path)) path = functions.convertToAbsolute(path);
  if (functions.isPathExists(path)) {
    arrayOfObjects = functions.getFilesMd(path)
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
  } else {
    return Promise.reject(new Error('La ruta ingresada no existe'));
  } // crear una promesa que resuelva un string
  return arrayOfObjects;
};

module.exports = mdLinks;

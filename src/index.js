const functions = require('./main');

const mdLink = (path, options) => {
  console.log('=> Ruta ingresada');
  if (functions.pathAbsolute(path)) {
    console.log('=> Es absoluta ' + path);
    if (functions.pathExists(path)) {
      console.log('=> Existe ruta');
      functions.typePath(path)
        .then(data => {
          if (data.isFile()) {
            if (functions.fileMd(path) === '.md') {
              functions.readContainFile(path)
                .then(data => {
                  const arrayOfObjects = functions.getArrLinks(data, path);
                  if (options === true) {
                    const newArrayofObjects = arrayOfObjects.map((object) => {
                      functions.validateLink(object.href)
                        .then((response) => {
                          arrayOfObjects.status = response.status;
                          arrayOfObjects.statusText = response.statusText;
                        })
                        .catch((error) => console.log(error.message))
                    })
                    console.log(newArrayOfObjects);
                  } else {
                    console.log('validate false');
                    return arrayOfObjects;
                  }
                })
                .catch(error => console.log(error))
            } else {
              console.log('No es archivo markdown');
            }
          } else {
            functions.readContainDirectory(path)
              .then(data => data.forEach(element => mdLink(path + '/' + element, options)))
              .catch(error => console.log(error))
          }
        })
        .catch(error => console.log(error))
    } else {
      console.log('=> La ruta no existe');
    }
  } else {
    const newPath = functions.convertToPathAbsolute(path);
    console.log('=> Es relativo, pasando a absoluto');
    mdLink(newPath, options);
  }
}

mdLink('../../../Projects/LIM011-fe-md-links/README.md', true);

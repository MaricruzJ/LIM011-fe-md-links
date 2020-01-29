const functions = require('./main');

const mdLink = (path, options) => {
  if (functions.isAbsolute(path)) {
    if (functions.isPathExists(path)) {
      functions.typePath(path)
        .then(data => {
          if (data.isFile()) {
            if (functions.fileFormat(path) === '.md') {
              functions.readFile(path)
                .then(data => {
                  const arrayOfObjects = functions.getLinks(data, path);
                  if (options === true) {
                    /* return arrayOfObjects.map((object) => {
                      functions.validateLink(object.href)
                        .then((response) => {
                          arrayOfObjects.status = response.status;
                          arrayOfObjects.statusText = response.statusText;                        
                        })
                        .catch((error) => console.log(error.message))
                    }) */
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
            functions.readDirectory(path)
              .then(data => data.forEach(element => {
                const newPath = functions.joinPath(path,element);
                mdLink(newPath, options)
              }))
              .catch(error => console.log(error))
          }
        })
        .catch(error => console.log(error))
    } else {
      console.log('=> La ruta no existe');
    }
  } else {
    const newPath = functions.convertToAbsolute(path);
    console.log('=> Es relativo, pasando a absoluto');
    mdLink(newPath, options);
  }
}

mdLink('../../../Projects/LIM011-fe-md-links/README.md', true);

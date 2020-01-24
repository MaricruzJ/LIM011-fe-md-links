const util = require('util');
const path = require('path');
const fs = require('fs');


/* const mdLink = (path) => {
  return path;
} */

const isAbsolute = (ruta) => {
  return path.isAbsolute(ruta) ? true : false;
}

const convertToAbsolute = (ruta) => {
  return path.resolve(ruta);
}

const isPathExists = (ruta) => {
  return fs.existsSync(ruta);
}

const isDirectory = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.stat(ruta, (err, stats) => {
      resolve(stats.isDirectory());
    })
  })
}
//1404

const isFile = (ruta) => {
  const stat = util.promisify(fs.stat);
  return stat(ruta)
}

const readDirectory = (ruta) => {
  const containDir = util.promisify(fs.readdir);
  return containDir(ruta);
}

const readFile = (ruta) => {
  const containFile = util.promisify(fs.readFile);
  return containFile(ruta, 'utf8');
}

const fileMarkdown = (ruta) => {
  return path.extname(ruta);
}






/* isDirectory('')
.then(data => console.log(data))
.catch(error => console.log(error)); */

/* isFile('/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/src/main.js')
  .then(stats => console.log(stats.isFile()))
  .catch(error => console.log(error)); */

/* readFile('/home/maricruzj/Desktop/Projects/LIM011-fe-social-network/Readme.md')
.then(data => console.log(data))
.catch(err => console.log(err)) */

const mainFunctions = {
  pathAbsolute: isAbsolute,
  convertToPathAbsolute: convertToAbsolute,
  PathExists: isPathExists,
  pathIsDirectory: isDirectory,
  pathIsFile: isFile,
  readContainDir: readDirectory,
  readContainFile: readFile,
  fileMd: fileMarkdown,
}

module.exports = mainFunctions;

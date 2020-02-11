#!/usr/bin/env node
const mdLinks = require('./index.js');
const showData = require('./options.js');

const option = {
  validate: false,
  stats: false,
};
const myArgs = process.argv.slice(2);


myArgs.forEach((argv) => {
  if (argv === '--validate' || argv === '-v') option.validate = true;
  if (argv === '--stats' || argv === '-s') option.stats = true;
});

if (myArgs.length >= 1) {
  mdLinks(myArgs[0], option)
    .then((arrayOfObjects) => {
      showData(arrayOfObjects, option);
    })
    .catch((error) => console.log(error.message));
} else {
  console.log('Debe ingresar una ruta a evaluar');
}

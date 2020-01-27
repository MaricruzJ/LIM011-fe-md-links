const mainFunctions = require('../src/main');

test('Debería de retornar true si la ruta ingresada es absoluta', () => {
  expect(mainFunctions.pathAbsolute('/home/maricruzj')).toBe(true);
});

test('Debería de retornar false si la ruta ingresada es relativa', () => {
  expect(mainFunctions.pathAbsolute('.')).toBe(false);
});

test('Debería de retornar "/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links" para "."', () => {
  expect(mainFunctions.convertToPathAbsolute('.')).toBe('/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links');
});

test('Debería de retornar true si la ruta ingresada existe ', () => {
  expect(mainFunctions.PathExists('/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links/README.md')).toBe(true);
});

test('Debería de retornar true si la ruta ingresada es carpeta', () => {
  return mainFunctions.pathIsDirectory('/home/maricruzj/').then(data => {
    expect(data).toBe(true);
  })
});

test('Debería de retornar true si la ruta ingresada es carpeta', () => {
  return mainFunctions.pathIsFile('/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links/README.md')
  .then(data => {
    expect(data.isFile()).toBe(true);
  })
});

test('Debería de retornar ...', () => {
  return mainFunctions.readContainDir('/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links/src')
  .then(files => {
    expect(files[0]).toMatch('main');
  })
});

test('Debería retornar ... para un archivo con contenido', () => {
  return mainFunctions.readContainFile('/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links/README.md')
  .then(files => {
    expect(files).toBeTruthy();
  })
});

test('Debería de retornar ... para un archivo vacío ...', () => {
  return mainFunctions.readContainFile('/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links/test/re.md')
  .then(files => {
    expect(files).toBeFalsy();
  })
});

test('Debería de retornar .md si la ruta ingresada es de un archivo markdown', () => {
  expect(mainFunctions.fileMd('/home/maricruzj/Escritorio/Projects/LIM011-fe-md-links/README.md')).toBe('.md');
});

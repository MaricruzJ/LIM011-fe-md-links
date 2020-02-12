const fetchMock = require('../__mocks__/node-fetch');
const mainFunctions = require('../src/main');
const mdLinks = require('../src/index');
const options = require('../src/options');

fetchMock.config.sendAsJson = false;

fetchMock
  .mock('https://es.wikipedia.org/wiki/Markdown', 200)
  .mock('https://nodejs.org/e/', 404)
  .mock('https://jestjs.io/', 200)
  .mock('hps://github.com/workshopper/learnyounode', 400);

const arrDetailLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/README-0.md',
  },
  {
    href: 'https://nodejs.org/e/',
    text: 'Node.js',
    file:
      '/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/dir-test/README-1.md',
  },
];

const newArrDetailLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/README-0.md',
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://nodejs.org/e/',
    text: 'Node.js',
    file:
      '/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/dir-test/README-1.md',
    status: 404,
    statusText: 'fail',
  },
];

const arrLinks = [
  {
    href: 'hps://github.com/workshopper/learnyounode',
    text: 'learnyounode',
    file: '/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/dir-test/dir-in-test/README-3.md',
  },
];

const newArrLinks = [
  {
    href: 'hps://github.com/workshopper/learnyounode',
    text: 'learnyounode',
    file: '/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/dir-test/dir-in-test/README-3.md',
    status: 400,
    statusText: 'fail',
  },
];



describe('A). file main.js', () => {
  it('1.- Debería de retornar true si la ruta ingresada es absoluta', () => {
    expect(mainFunctions.isAbsolute('/home/maricruzj')).toBe(true);
  });

  it('2.- Debería de retornar la ruta absoluta actual para "."', () => {
    expect(mainFunctions.convertToAbsolute('.')).toBe(process.cwd());
  });

  it('3.- Debería de retornar true si la ruta ingresada existe ', () => {
    expect(mainFunctions.isPathExists('README.md')).toBe(true);
  });

  it('4.- Debería de retornar el estado de la ...', () => mainFunctions.typePath('README.md')
    .then((data) => {
      expect(data.isFile()).toBe(true);
    }));

  it('5.- Debería de retornar un array que contenga los nombres de los archivos o carpetas', () => mainFunctions.readDirectory('/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/src')
    .then((files) => {
      expect(files[0]).toMatch('cli.js');
    }));

  it('6.- Debería retornar una promesa que resuelva el contenido del archivo enviado', () => mainFunctions.readFile('README.md')
    .then((files) => {
      expect(files).toBeTruthy();
    }));

  it('7.- Debería retornar el formato o extensión del archivo enviado ', () => {
    expect(mainFunctions.fileFormat('folder-test/README-0.md')).toBe('.md');
  });

  it('8.- Debería de retornar una ruta', () => {
    expect(mainFunctions.joinPath('LIM011-fe-md-links', 'README.md')).toBe('LIM011-fe-md-links/README.md');
  });

  it('9.- Debería retornar un array que contiene las rutas de los archivos de formato .md', () => mainFunctions.getFilesMd('/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test')
    .then((arr) => {
      expect(arr[0]).toEqual('/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/README-0.md');
    }));

  it('10.- Debería de retornar un array de objetos, cada objeto con sus tres valores', () => {
    expect(mainFunctions.getLinksDetail('Pre [Wiki](https://es.wikipedia.org)...', '.')).toEqual([{ file: '.', href: 'https://es.wikipedia.org/', text: 'Wiki' }]);
  });

  it('11.- Debería de devolver el array con dos nuevos campos: status y statusText', () => mainFunctions.validateLinks(arrDetailLinks)
    .then((values) => {
      expect(values).toEqual(newArrDetailLinks);
    }));

  it('11.1.- Debería de devolver el array con dos nuevos campos: status y statusText', () => mainFunctions.validateLinks(arrLinks)
    .then((values) => {
      expect(values).toEqual(newArrLinks);
    }));

});

describe('B). file index.js', () => {
  it('12.- Debería de devolver el array de objetos, cada objeto con tres campos', () => mdLinks('test', { validate: false, stats: false })
    .then((values) => {
      expect(values[0]).toEqual({ file: '/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/README-0.md', href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown' });
    }));

  it('13.- Debería de devolver el array de objetos, cada objeto con 5 campos', () => mdLinks('test', { validate: true, stats: false })
    .then((values) => {
      expect(values[0]).toEqual({
        file: '/home/maricruzj/Desktop/Projects/LIM011-fe-md-links/test/folder-test/README-0.md', href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', status: 200, statusText: 'OK',
      });
    }));
});

describe('C). file options.js', () => {
  /* it('14.- Validate: true & stats: true', () => {
    const log = jest.spyOn(global.console, 'log');
    options(['test', '-v'], { validate: true, stats: true });
    expect(log).toHaveBeenCalledWith('Total: 2 \nUnique: 1 \nBroken: 0');
  }); */

  it('14.- Validate: true & stats: true', () => {
    expect(options.statsAndValidate(newArrDetailLinks)).toEqual('Total: 2 \nUnique: 2 \nBroken: 1');
  });

  it('15.- only validate', () => {
    expect(options.onlyValidate(newArrDetailLinks)).toMatch('200 OK');
  });

  it('16.- only stats', () => {
    expect(options.onlyStats(newArrDetailLinks)).toEqual('Total: 2 \nUnique: 2');
  });

  it('17.- only path', () => {
    expect(options.onlyPath(arrDetailLinks)).toMatch('test/folder-test/dir-test/README-1.md https://nodejs.org/e/ Node.js');
  });
});

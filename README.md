# Markdown Links

Es una librería implementada con Javascript para ser ejecutada con
Node.js.

- Instalar la libreria via `npm install --global https://github.com/MaricruzJ/LIM011-fe-md-links` 

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de la librería se realiza a través de la terminal

`md-links <path-to-file> [options]`

Por ejemplo:
```js 
md-Links ./some/example.md 
```

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```
#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces retorna el código del estado. En caso de que sea distinto, el mensaje es un `fail`.

Por ejemplo:

```js 
md-Links ./some/dir --validate
```
```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas básicas sobre los links.

```js 
md-Links ./some/example.md --stats
```
```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```js 
md-Links ./some/example.md --stats --validate
```
```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## Objetivos de aprendizaje

### Javascript
- [x] Uso de callbacks
- [x] Consumo de Promesas
- [x] Creacion de Promesas
- [x] Modulos de Js
- [x] Recursión

### Node
- [x] Sistema de archivos
- [x] package.json
- [x] crear modules
- [x] Instalar y usar modules
- [x] npm scripts
- [x] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [x] Testeo de tus funciones 
- [x] Testeo asíncrono
- [x] Uso de librerias de Mock
- [ ] Mocks manuales
- [x] Testeo para multiples Sistemas Operativos

### Git y Github
- [x] Organización en Github

### Buenas prácticas de desarrollo
- [x] Modularización
- [x] Nomenclatura / Semántica
- [x] Linting

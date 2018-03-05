/**
 * @author Alex Lunyov <isuntc@gmail.com>
*/

const through = require('through2');
const { jsdom } = require('jsdom');
const Vinyl = require('vinyl');

module.exports = () => {
  const transform = (file, encoding, callback) => {
    const document = jsdom(file.contents.toString('utf-8'));
    const svg = document.querySelector('svg');
    const globalDefs = document.createElement('defs');
    const localDefs = svg.querySelectorAll('defs');
    globalDefs.innerHTML = Array.from(localDefs).reduce(
      (memo, def) => {
        def.parentNode.removeChild(def);
        return memo + def.innerHTML;
      },
      ''
    );
    svg.insertBefore(globalDefs, svg.childNodes[0]);
    const outputFile = new Vinyl({
      path: file.path,
      base: file.base,
      cwd: file.cwd,
      contents: new Buffer(document.body.innerHTML)
    });
    callback(null, outputFile);
  };

  return through.obj(transform);
};

const glob = require('glob');
const { normalize, parse } = require('path');

function AddExtraEntryFile(options) {
  this.options = options;
}

AddExtraEntryFile.prototype.apply = function (compiler) {
  compiler.hooks.entryOption.tap('AddExtraEntryFile', () => {
    const extraFilesArr = this.options.dirs.map((dir) => {
      const files = glob.sync(dir, {});
      return files.map((f) => {
        // normalize解决Windows下路径分隔符bug
        const normalizeFile = normalize(f);
        return normalizeFile;
      });
    });

    const { options } = compiler;
    const { entry, mode } = options;
    const entries = Object.keys(entry);
    if(mode === 'development'){
      entries.forEach(name => {
        extraFilesArr.forEach(files => files.forEach(f => {
          const metas = parse(f);
          if(metas.ext === '.html' && !entries.includes(metas.name)) {
            entry[name].push(f);
          }
          if(metas.name.split('.')[0] === name){
            entry[name].push(f);
          }
        }));
      })
    }
  })
};

module.exports = AddExtraEntryFile;

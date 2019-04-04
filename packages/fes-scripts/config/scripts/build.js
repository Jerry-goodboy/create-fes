import webpack from 'webpack';
import { copySync } from 'fs-extra';
import chalk from 'chalk';
import config from '../webpack.prod';
import paths from '../utils/paths';

function copyPublicFolder() {
  copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    // filter: file => file !== paths.appHtml,
  });
}

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    throw err;
  }
  process.stdout.write(`${stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  })}\n\n`);

  console.log(chalk.cyan('  Build complete.\n'));
  console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'));
  copyPublicFolder();
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');
const Router = require('koa-router');
const c2k = require('koa2-connect');
const glob = require('glob');
// const devMiddleware = require('webpack-dev-middleware');
// const proxyMiddleware = require('http-proxy-middleware');
// const hotMiddleware = require('webpack-hot-middleware');
// const address = require('address');
// const opn = require('opn');
// const webpack = require('webpack');
// const qrcodeTerminal = require('qrcode-terminal');
const paths = require('../paths'); // eslint-disable-line
const appConfig = require(paths.appConfig); // eslint-disable-line
const router = require('./router');

// const config = require('../webpack.dev');
// const appConfig = require('../../app.config');
// const paths = require('../utils/paths');
// const api = require('../../src/api');


const { routerConfig } = appConfig;
// const { port, autoOpen, qrcode } = appConfig.dev;

const app = new Koa();
// onerror
app.on('error', err => console.error(err));
// static
app.use(serve(paths.appDirectory));
// router
app.use(router(app, routerConfig));

module.exports = app;


// const compiler = webpack(config);
// const views = join(paths.appSrc, 'views/*.html');

// // paths
// const viewstemp = join(paths.config, '.temp');
// /* eslint global-require: [0] */

//     const mapRoutes = Object.keys(routerConfig);
//     if (mapRoutes.length > 0) {
//       mapRoutes.forEach((r) => {
//         router.get(r, async (ctx) => {
//           await send(ctx, routerConfig[r], { root: viewstemp });
//         });
//       });
//     } else {
//       const files = glob.sync(views, {});
//       files.forEach((f) => {
//         const metas = parse(f);
//         mapRoutes.push(`/${metas.name}`);
//         router.get(`/${metas.name}`, async (ctx) => {
//           await send(ctx, `${metas.name}.html`, { root: viewstemp });
//         });
//       });
//     }
//     console.log(mapRoutes);
//     router.redirect('/', mapRoutes[0]);

//     api(router);
//     const devMiddleware = dev(compiler, {
//       // lazy: true,
//       logTime: true,
//       stats: {
//         colors: true,
//       },
//     });
//     app.use(c2k(devMiddleware));
//     if (isHot) {
//       const hotMiddleware = hot(compiler);
//       // bind hotMiddleware to compiler
//       compiler.fesHotMiddleware = hotMiddleware;
//       app.use(c2k(hotMiddleware));
//     }
//     // proxy
//     try {
//       Object.keys(proxy || {}).forEach((context) => {
//         let options = proxy[context];
//         if (typeof options === 'string') {
//           options = { target: options };
//         }
//         // router.get(options.filter || context, c2k(proxyMiddleware(options)));
//         router.all(options.filter || context, c2k(proxyMiddleware(options)));
//       });
//     } catch (error) {
//       console.log(error);
//     }

//     app.use(router.routes());
//     app.use(serve('.'));
//     const server = app.listen(p, () => {
//       // https://github.com/webpack-contrib/webpack-hot-middleware/issues/210
//       // solve a hmr bug
//       server.keepAliveTimeout = 0;
//     });
//     server.on('error', () => {
//       console.log('singsong');
//     });
//     const LOCA = `http://localhost:${p}`;
//     const ADDR = `http://${address.ip()}:${p}`;
//     const uri = chalk.green(`server is listening at:  ${chalk.blueBright(`${LOCA}`)}`);
//     const ip = chalk.green(`server is listening at:  ${chalk.blueBright(`${ADDR}`)}`);
//     devMiddleware.waitUntilValid(() => {
//       console.log(uri);
//       console.log(ip);
//       if (qrcode) {
//         qrcodeTerminal.generate(ADDR, { small: true }, (qr) => {
//           console.log(chalk.green('scan the QR code below:'));
//           console.log(chalk.blue(qr));
//         });
//       }
//       /* eslint no-extra-boolean-cast: [0] */
//       let OPEN_URL = LOCA;
//       if (!!autoOpen) {
//         if (typeof autoOpen === 'string') {
//           if (mapRoutes.indexOf(autoOpen) > -1) {
//             OPEN_URL += autoOpen;
//           }
//         }
//         opn(OPEN_URL);
//       }
//     });
//     ['SIGINT', 'SIGTERM'].forEach((sig) => {
//       process.on(sig, () => {
//         server.close();
//         process.exit();
//       });
//     });
//   })
//   .catch((err) => {
//     if (err && err.message) {
//       console.log(err.message);
//     }
//     process.exit(1);
//   });

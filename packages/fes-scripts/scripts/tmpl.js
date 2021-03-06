require('./utils/pre')(); // eslint-disable-line

const { join } = require('path');
const Twig = require('twig');
const fse = require('fs-extra');
const Base = require('./utils/Base');

const base = new Base('tmpl');

base.run((paths, chalk) => {
  const { entryNames } = paths.fesMap;

  if (!fse.existsSync(join(paths.appBuildTmpl))) {
    base.softExit(null, 0, () => {
      console.error(
        chalk.redBright(
          `Please make sure ${chalk.greenBright('build dir')} generated, and ${chalk.blueBright(
            'npm run build'
          )} to build tmpl for it!`
        )
      );
    });
  }

  base.app.use(
    base.views(join(paths.appNodeModules, 'fes-scripts', 'scripts', 'utils', 'tmpl'), {
      map: {
        html: 'twig',
      },
    })
  );

  const mapPageToRoute = [];
  const routes = [];
  Object.keys(entryNames).forEach((f) => {
    const {
      name, route, buildTmpl,
    } = entryNames[f];

    mapPageToRoute.push({ url: route, name: name.replace('_', '/') });
    routes.push({
      path: route,
      method: 'get',
      middleware: async (ctx) => {
        const template = Twig.twig({
          // id: id, // id is optional, but useful for referencing the template later
          data: fse.readFileSync(buildTmpl, 'utf8'),
          allowInlineIncludes: true,
          path: buildTmpl,
        });
        const mockData = await base.getMockData(route);
        ctx.body = template.render(mockData);
        ctx.type = 'text/html';
      },
    }); // eslint-disable-line
  });

  routes.push({
    path: '/',
    method: 'get',
    middleware: async (ctx) => {
      await ctx.render('template', { pages: mapPageToRoute });
    },
  });
  base.createRouter(routes, paths.appBuild);
  base.app.use(base.serve(paths.appBuild));
  const server = base.app.listen(base.port, () => {
    base.logViewInfo();
    base.autoOpenBrowser();
  });
  base.bindSigEvent(server);
  base.bindCommand();
});

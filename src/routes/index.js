const siteRouter = require('./site');


function route(app) {
  app.use('/api', siteRouter);
}

module.exports = route;

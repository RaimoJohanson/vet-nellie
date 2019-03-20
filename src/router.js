const router = require('express').Router();
const data = require('./controllers/data');
const features = require('./controllers/features');
const decisions = require('./controllers/decisions');
const common = require('./controllers/common');

const ROUTE = '/';

module.exports = (app) => {
  router.route('/data')
    .get(/* authorize, */ data.fetchAll(app))
    .post(/* authorize, validate */ data.create(app));

  router.route('/features')
    .get(/* authorize, */ features.fetchAll(app))
    .post(/* authorize, validate */ features.create(app));
  router.route('/features/autocomplete')
    .get(/* authorize, */ features.autocomplete(app));

  router.route('/features/:id')
    .get(/* authorize, */ features.fetchOne(app))
    .put(/* authorize, validate */ features.update(app))
    .delete(/* authorize, */ features.delete(app));

  router.route('/decisions')
    .get(/* authorize, */ decisions.fetchAll(app))
    .post(/* authorize, validate */ decisions.create(app));

  router.route('/decisions/autocomplete')
    .get(/* authorize, */ decisions.autocomplete(app));

  router.route('/decisions/:id')
    .get(/* authorize, */ decisions.fetchOne(app))
    .put(/* authorize, validate, */ decisions.update(app))
    .delete(/* authorize, */ decisions.delete(app));

  app.use(ROUTE, /* authenticate */ router);

  app.use(common.notfound());
};

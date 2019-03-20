const cors = require('cors');
const bodyParser = require('body-parser');
const bookshelf = require('./bookshelf');


module.exports = (app) => {
  app.set('bookshelf', bookshelf);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`); // eslint-disable-line
      next();
    });
  }

  require('./router')(app); // eslint-disable-line global-require
};

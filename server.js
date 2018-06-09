require('dotenv').config();
const express = require('express');
const next = require('next');
const logger = require('morgan');
const passport = require('passport');
const expressValidator = require('express-validator');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT;

const routes = {
  users: require('./server/routes/users')
};

app.prepare()
  .then(() => {
    const server = express();

    server.use(logger('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    // passport
    server.use(passport.initialize());
    server.use(passport.session());

    // validator
    server.use(expressValidator({
      errorFormatter: (param, msg, value) => {
        const namespace = param.split('.');
        global = namespace.shift();
        let formParam = global;

        while (namespace.length) {
          formParam += `[${namespace.shift()}]`;
        }
        return {
          param: formParam,
          msg,
          value
        };
      }
    }));

    // routes
    server.use('/users', routes.users);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

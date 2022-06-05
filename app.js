const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');

const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorControllers');
const { AppError } = require('./utils/errorUtils');

const app = express();

//---------------------------------------------------------------------------//
//                       LOADING CONFIG FILE VARIABLES
//---------------------------------------------------------------------------//
dotenv.config({ path: './config.env' }); // loading .env variables

//-------------------------------------------------------------------------//
//                            GLOBAL MIDDLEWARES
//-------------------------------------------------------------------------//

app.use(compression()); // for compressing response bodies
app.use(
  // for making the app more secure by setting some security headers(like CORS)
  helmet({
    contentSecurityPolicy: {
      directives: {
        // only allowing images from 'm.media-amazon.com' as crossorigin
        'img-src': ["'self'", 'm.media-amazon.com'],
      },
    },
    // 'crossorigin' attribute is needed in the img tag where images are fetched from 'm.media-amazon.com' if the policy below is set to true. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy for more details
    crossOriginEmbedderPolicy: false,
  })
);

app.set('view engine', 'pug'); // setting pug as a view engine
app.set('views', path.join(__dirname, 'views/pug')); // directory from where html template will be sourced

app.use(express.static(path.join(__dirname, 'public'))); // directory from where files like css, images, fonts, will be sourced

if (process.env.NODE_ENV === 'development') app.use(morgan('dev')); // for logging requests
// app.use(express.json({ limit: '3mb' })); // for parsing json

//-------------------------------------------------------------------------//
//                            ROUTER MIDDLEWARES
//-------------------------------------------------------------------------//
// app.use('/api/v1/movies', movieRouter); // sub-router for movie related endpoints
app.use('/', viewRouter); // for html pages

//-------------------------------------------------------------------------//
//                         GLOBAL ERROR HANDLING
//-------------------------------------------------------------------------//
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `the route you requested(${req.originalUrl}) doesn't exist`,
      404
    )
  );
});
app.use(globalErrorHandler); // handling errors in every middleware

module.exports = app;

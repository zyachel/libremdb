const { AppError } = require('../utils/errorUtils');

//----------------------------------------------------------------------------------------------------------//
//                                  ERROR HANDLING FUNCTIONS ACC TO ENVIRONMENTS
//----------------------------------------------------------------------------------------------------------//
// for errors during development
const devErrorHandler = (err, req, res) => {
  req.originalUrl.startsWith('/api/')
    ? //            1) FOR API
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err,
      })
    : //           2) FOR RENDERED PAGES
      res.render('error', {
        title: 'an error occured',
        page: 'error',
        message: err.message,
        statusCode: err.statusCode,
        stack: err.stack,
      });
};

// for errors during production
const prodErrorHandler = (err, req, res) => {
  if (req.originalUrl.startsWith('/api/'))
    //            1) FOR API
    // for trusted, operational errors
    err.isOperational
      ? res
          .status(err.statusCode)
          .json({ status: err.status, message: err.message })
      : // for untrusted errors sending a generic message
        res
          .status(500)
          .json({ status: 'fail', message: 'something went wrong!' });

  //           2) FOR RENDERED PAGES
  err.isOperational
    ? res.render('error', {
        title: 'something went wrong',
        page: 'error',
        message: err.message,
        statusCode: err.statusCode,
      })
    : res.render('error', {
        title: 'an error occured',
        page: 'error',
        message: 'something went wrong!',
        statusCode: 500,
      });
  // err;
};

//-------------------------------------------------------------------------------------------------------------//
//                                 MAIN EXPRESS ERROR HANDLING MIDDLEWARE
//-------------------------------------------------------------------------------------------------------------//
const globalErrorHandler = (err, req, res, next) => {
  // setting some defaults on the error in case they don't exist already
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // logging error to the console
  console.log('\x1b[31m%s\x1b[0m', '🔴️ ERROR:', err); // with red color

  // sending error to the client
  // for dev environment
  if (process.env.NODE_ENV === 'development') devErrorHandler(err, req, res);
  // for prod environment
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    // marking some special errors as operational
    // axios errors
    if (err.isAxiosError) {
      // if connection can't be established to imdb for some reason
      if (err.code === 'ENETUNREACH' || err.code === 'ENOTFOUND')
        error = new AppError(
          'there was some problem fetching data from IMDb',
          500
        );

      // in case the url is wrong(like bad title id)
      if (err.response)
        error = new AppError(err.response.statusText, err.response.status);
    }

    prodErrorHandler(error, req, res);
  }
};

module.exports = globalErrorHandler;

const dotenv = require('dotenv');
const app = require('./app');

//---------------------------------------------------------------------------//
//                          ERROR HANDLING IN NODEJS
//---------------------------------------------------------------------------//
// for synchronus errors that are not caught anywhere. Should come before any code
process.on('uncaughtException', err => {
  console.log('\x1b[31m%s\x1b[0m', '🔴️ ERROR:', err);
  process.exit(1);
});

// for rejected promises that aren't caught anywhere
process.on('unhandledRejection', err => {
  console.log('\x1b[31m%s\x1b[0m', '🔴️ ERROR:', err);
  server.close(() => process.exit(1)); // shutting the system down gracefully
});

//---------------------------------------------------------------------------//
//                       LOADING CONFIG FILE VARIABLES
//---------------------------------------------------------------------------//
dotenv.config({ path: './config.env' }); // loading .env variables

//---------------------------------------------------------------------------//
//                              STARTING SERVER
//---------------------------------------------------------------------------//
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(
    '\x1b[36m%s\x1b[0m', // for colors lol. Search for ansi escape characters
    `🎧️ listening at port ${port}. Env: ${process.env.NODE_ENV}`
  )
);

const request = require('request-promise');

require('dotenv').config();

if (process.env.URI === undefined || process.env.APP_NAME === undefined ) {
  console.log("Please setup the environment varibles.");
  process.exit(1);
}


const requestOptions = {
  uri: `${process.env.URI}/session`,
  headers: {
    'X-CC-APP': process.env.APP_NAME
  },
  method: 'POST',
  resolveWithFullResponse: true
};


console.log(`\n \nMAKING REQUEST WITH ${requestOptions.method} METHOD TO ${requestOptions.uri} \n`);

return request(requestOptions)
  .then(result => {

    console.log('Response from /v3/session: \n', result.body);

    process.exit();

  })
  .catch(error => {

    console.error('Error from /v3/session: \n', { statusCode: error.statusCode, body: JSON.parse(error.error) } );

    process.exit();

  });
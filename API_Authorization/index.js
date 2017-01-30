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


console.log(`MAKING REQUEST WITH ${requestOptions.method} METHOD TO ${requestOptions.uri} \n`);

request.defaults({ jar: true });

return request(requestOptions)
  .then(result => {

    console.log('Response from /v3/session: \n', result.body);

  })
  .catch(error => {

    console.error('Error from /v3/session: \n', { statusCode: error.statusCode, message: JSON.parse(error.error) } );

  });
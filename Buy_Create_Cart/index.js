const request = require('request-promise'),
      cookieJar = request.jar();

require('dotenv').config();

if (process.env.URI === undefined || process.env.APP_NAME === undefined ) {
  console.log("Please setup the environment varibles.");
  process.exit(1);
}


const requestSessionOptions = {
  uri: `${process.env.URI}/session`,
  headers: {
    'X-CC-APP': process.env.APP_NAME
  },
  method: 'POST',
  jar: cookieJar,
  json: true,
  resolveWithFullResponse: true,
};

console.log(`\n \nMAKING REQUEST WITH ${requestSessionOptions.method} METHOD TO ${requestSessionOptions.uri} \n`);

return request( requestSessionOptions )
  .then( result => {

    console.log('Response from /v3/session: \n', result.body);

    return {
      uri: `${process.env.URI}/carts`,
      headers: {
        'X-CC-APP': process.env.APP_NAME
      },
      form: {
        action: 'buy'
      },
      method: 'POST',
      jar: cookieJar,
      json: true,
      resolveWithFullResponse: true,
    };

  })
  .then( requestBuyCartOptions => {

    console.log(`\n \nMAKING REQUEST WITH ${requestBuyCartOptions.method} METHOD TO ${requestBuyCartOptions.uri} WITH DATA ${JSON.stringify(requestBuyCartOptions.form)} \n`);

    return request(requestBuyCartOptions);

  })
  .then( result => {

    console.log('Response from /v3/carts: \n', result.body);

    process.exit();

  })
  .catch( error => {

    const errorPath = error.options.uri.slice( error.options.uri.indexOf('/v3'), error.options.uri.length );

    console.error(`Error from ${errorPath}: \n`, { statusCode: error.statusCode, body: error.error } );

    process.exit();

  });
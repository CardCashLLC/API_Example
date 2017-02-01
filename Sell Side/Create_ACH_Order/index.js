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

return request(requestSessionOptions)
  .then( result => {

    console.log('Response from /v3/session: \n', result.body);

    return {
      uri: `${process.env.URI}/carts`,
      headers: {
        'X-CC-APP': process.env.APP_NAME,
        'content-type': 'application/json'
      },
      body: {
        action: 'sell'
      },
      method: 'POST',
      jar: cookieJar,
      json: true,
      resolveWithFullResponse: true,
    };

  })
  .then( requestSellCartOptions => {

    console.log(`\n \nMAKING REQUEST WITH ${requestSellCartOptions.method} METHOD TO ${requestSellCartOptions.uri} WITH DATA ${JSON.stringify(requestSellCartOptions.body)} \n`);

    return request(requestSellCartOptions);

  })
  .then( result => {

    console.log('Response from /v3/carts: \n', result.body);

    return {
      uri: `${process.env.URI}/carts/${result.body.cartId}/cards`,
      headers: {
        'X-CC-APP': process.env.APP_NAME,
        'content-type': 'application/json'
      },
      body: {
        card: {
          merchantId: 99,
          enterValue: 100,
          number: "5555555682054671",
          pin: "1234"
        }
      },
      method: 'POST',
      jar: cookieJar,
      json: true,
      resolveWithFullResponse: true
    };

  })
  .then( requestSellCardOptions => {

    console.log(`\n \nMAKING REQUEST WITH ${requestSellCardOptions.method} METHOD TO ${requestSellCardOptions.uri} WITH DATA ${JSON.stringify(requestSellCardOptions.body)} \n`);

    return request(requestSellCardOptions);

  })
  .then( result => {

    console.log(`Response from /v3/carts/${result.body.cartId}/cards: \n`, result.body);

    return {
      uri: `${process.env.URI}/orders`,
      headers: {
        'X-CC-APP': process.env.APP_NAME,
        'content-type': 'application/json'
      },
      body: {
        customer: {
          firstname: "James",
          lastname: "Russell",
          email: "C8SZ8YS@gmail.com",
          phone: "18002271234",
          address: {
              street: "990 Cedar Bridge Ave",
              city: "Brick",
              state: "NJ",
              postcode: "08723"
          }
        },
        paymentDetails: {
          id: null,
          routingNumber: "123456789",
          accountNumber: "1234567",
          save: true
        },
        creditCard: {
          number: "4111111111111111",
          ccv: "901",
          expMonth: "01",
          expYear: "2045",
          save: true
        },
        cartId: result.body.cartId,
        paymentMethod: "ACH"
      },
      method: 'POST',
      jar: cookieJar,
      json: true,
      resolveWithFullResponse: true
    };

  })
  .then( requestSellOrderOptions => {

    console.log(`\n \nMAKING REQUEST WITH ${requestSellOrderOptions.method} METHOD TO ${requestSellOrderOptions.uri} WITH DATA ${JSON.stringify(requestSellOrderOptions.body)} \n`);

    return request(requestSellOrderOptions);

  })
  .then( result => {

    console.log(`Response from /v3/orders: \n`, result.body);

    process.exit();

  })
  .catch( error => {

    const errorPath = error.options.uri.slice( error.options.uri.indexOf('/v3'), error.options.uri.length );
console.log(error.error )
    console.error(`Error from ${errorPath}: \n`, { statusCode: error.statusCode, body: error.error } );

    process.exit();

  });

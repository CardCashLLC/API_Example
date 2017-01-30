const request = require('request-promise');

require('dotenv').config();

if (process.env.URI === undefined || process.env.APP_NAME === undefined ) {
  console.log("Please setup the environment varibles.");
  process.exit(1);
}


const requestOptions = {
  uri: `${process.env.URI}/session`,
  headers: {
    'Authorization': 'CC_AUTH eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDYXJkQ2FzaCIsInN1YiI6InVybjpDYXJkQ2FzaCIsImF1ZCI6InVybjpDYXJkQ2FzaCIsImlhdCI6MTQ4Mzk5NTg2M30.XXmK9Gsh_hpWb-a2nghszRaMs42iMVFInxuhz0yy41uhoYvesazrrPLph_iQ4p7GtOubzjI9xPv_LWSu2KOZHl1H1tXrG5H6otOhEVWc4zIMk8ncW0GqAEQHHMqjal57Z-T-e1co3lJetO81_B3By4BW1yeUONeuVrVUNFROvcro6REwCm6rxA6VoaCArERJ8S0Wja9m-S6DjNt3MeKA5PoQSirBtBtmwYIBxeNHwBZ7BoP7qbj5jDl-VEWNuz0VnT0fjs2W8siumgZf6e5uqGpTCSbtrvTV11jiHidStjtMmELeRaX_gtD3YX-SJcAI2tHcSF9RH6mejmJt4FGaWQ'
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
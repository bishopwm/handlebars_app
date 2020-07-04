const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({ path: '.env' });
const authId = process.env.AUTH_ID;
const authToken = process.env.AUTH_TOKEN;

let plivo = require('plivo');
let client = new plivo.Client(authId,authToken);


client.messages.create(
  '+15186552109',
  '+15182486899',
  'Hello, from the other side!'
).then(function(response) {
  console.log(response);
  console.log(response.messageUuid);
  axios.post("https://ensgdc8zidz8k.x.pipedream.net", {response}).then(response => {
    console.log(response);
    });
});




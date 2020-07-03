const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const authId = process.env.AUTH_ID;
const authToken = process.env.AUTH_TOKEN;

let plivo = require('plivo');
let client = new plivo.Client(authId,authToken);

client.messages.create(
  '+15186552109',
  '+15182486899',
  'Hello, world!'
).then(function(message_created) {
  console.log(message_created)
});
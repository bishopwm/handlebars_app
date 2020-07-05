// Export sendSMS module to call on 'Send Message' submission
let sendSMS = function sendSMS(toNumber, messageText){
    const dotenv = require('dotenv');
    const axios = require('axios');

    dotenv.config({ path: '.env' });
    const authId = process.env.AUTH_ID;
    const authToken = process.env.AUTH_TOKEN;
    const phone1 = process.env.PHONE1;
    // ^Will's Phone
    const phone2 = process.env.PHONE2;
    // ^Plivo's Phone

    let plivo = require('plivo');
    let client = new plivo.Client(authId, authToken);

    client.messages.create(
        phone2,
        toNumber,
        messageText
        ).then(function(response) {
        console.log(response);
    });
    
};

module.exports.sendSMS = sendSMS;
// Export sendSMS module to call on 'Send Message' form submission

let sendSMS = function sendSMS(toNumber, messageText){
    const dotenv = require('dotenv');

    dotenv.config({ path: '.env' });
    const authId = process.env.AUTH_ID;
    const authToken = process.env.AUTH_TOKEN;
    
    // Plivo Phone Number:
    const phone2 = process.env.PHONE2;

    let plivo = require('plivo');
    let client = new plivo.Client(authId, authToken);

    // Plivo create message
    client.messages.create(
        phone2,
        toNumber,
        messageText
        ).then(function(response) {
        console.log(response);
    });
    
};

module.exports.sendSMS = sendSMS;
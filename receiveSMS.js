const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const axios = require('axios');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, response, next) {
    response.contentType('application/xml');
    next();
});
app.set('port', (8000));
app.all('/receive_sms/', function (request, response) {
    let from_number = request.body.From || request.query.From;
    let to_number = request.body.To || request.query.To;
    let text = request.body.Text || request.query.Text;

    // send JSON sms objects to request bin
    let from_number_json = JSON.stringify(request.body.From);
    let to_number_json = JSON.stringify(request.body.To);
    let text_json = JSON.stringify(request.body.Text);
    //Print the message
    console.log('Message received - From: ' + from_number + ', To: ' + to_number + ', Text: ' + text);
    axios.post("https://ensgdc8zidz8k.x.pipedream.net", {from_number_json, to_number_json, text_json}).then(response => {
        console.log(response);
        });
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
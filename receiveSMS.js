const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

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
    //Print the message
    console.log('Message received - From: ' + from_number + ', To: ' + to_number + ', Text: ' + text);
    // res.render('main', {layout: 'index', myNumber: from_number, theirNumber: to_number, myText: text});
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});



const express = require('express');
const app = express();
const port = 5000;
// Require Axios/BodyParser for Message Content Storage
const axios = require('axios');
const bodyParser = require('body-parser');
// Require sender to call sendSMS.js script on 'Send Message' form submission
var sender = require('./sendSMS.js');

// Load handlebars module
const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
// Set handlebars configurations 
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    }));
app.get('/', (req, res) => {
    res.render('main');
});

// Express/BodyParser defaults
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

// Route for serving up recent SMS messages (View Messages)
app.get('/view-incoming-messages', (req, res) => {
     axios.get("https://ironrest.herokuapp.com/willbcollection").then(response => {
        console.log(response);
        let messageData = response.data
        res.render('main.hbs', {messageData});
    });
});

// Route for rendering 'Send Message' page:
app.get("/send-message", (req, res) => {
    res.render('send.hbs');
  });

// Route for POSTing new message to sendSMS.js file
app.post("/send-message", function(req,res) {
    console.log(req.body.To, req.body.Text)
    let toNumber = req.body.To;
    let messageText = req.body.Text;
    let timestamp = new Date();
    sender.sendSMS(toNumber, messageText),
    axios.post("https://ironrest.herokuapp.com/willbcollection2", {toNumber, messageText, timestamp}).then(apiRes => {
        console.log(apiRes);
    });
    res.redirect(301, '/view-sent-messages');
});

// Route for getting sent messages
app.get('/view-sent-messages', (req, res) => {
    axios.get("https://ironrest.herokuapp.com/willbcollection2").then(response => {
       console.log(response);
       let sentMessageData = response.data
       res.render('main.hbs', {sentMessageData});
   });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
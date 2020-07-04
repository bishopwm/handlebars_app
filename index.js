const express = require('express');
const app = express();
const port = 5000;
// Require Axios/BodyParser for Message Content Storage
const axios = require('axios');
const bodyParser = require('body-parser');
// Require sender to call sendSMS.js file on 'Send Message' submission
var sender = require('./sendSMS.js');

// Load handlebars module
const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
// Set handlebars configurations 
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    //new configuration parameter
    defaultLayout: 'index',
    }));
app.get('/', (req, res) => {
    res.render('main');
});

// Express/BodyParser defaults
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

// Route for serving up recent SMS messages (View Messages)
app.get('/view-messages', (req, res) => {
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
    sender.sendSMS(toNumber, messageText);
});

app.listen(port, () => console.log(`App listening to port ${port}`));
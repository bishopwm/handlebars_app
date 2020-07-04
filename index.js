const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');
const bodyParser = require('body-parser');
var sender = require('./sendSMS.js');

//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    //new configuration parameter
    defaultLayout: 'index',
    }));
app.get('/', (req, res) => {
    //instead of res.render('main', {layout: 'index'});
    res.render('main');
});
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/view-messages', (req, res) => {
     axios.get("https://ironrest.herokuapp.com/willbcollection").then(response => {
        console.log(response);
        let messageData = response.data
        res.render('main.hbs', {messageData});
    });
});
app.get("/send-message", (req, res) => {
    res.render('send.hbs');
  });
app.post("/send-message", function(req,res) {
    console.log(req.body.To, req.body.Text)
    let toNumber = req.body.To;
    let messageText = req.body.Text;
    sender.sendSMS(toNumber, messageText);
});

app.listen(port, () => console.log(`App listening to port ${port}`));
const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');
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
app.get('/stuff', (req, res) => {
    let myVariable = 'heyyyyy'
    res.render('main.hbs', {myVariable});
});
app.get('/things', (req, res) => {
    let thisVariable = 'thissssss'
    res.render('main.hbs', {thisVariable});
});
app.get('/cosas', (req, res) => {
     axios.get("https://ironrest.herokuapp.com/willbcollection").then(response => {
        console.log(response);
        let messageId = response.data[0]._id;
        let fromNumber = response.data[0].from_number_json;
        let toNumber = response.data[0].to_number_json;
        let messageText = response.data[0].text_json;
        res.render('main.hbs', {messageId, messageText, fromNumber, toNumber});
    });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
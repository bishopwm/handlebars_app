const express = require('express');
const app = express();
const port = 5000;
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
app.get('/', (req, res) => {
//Serves the body of the page aka "main.hbs" to the container //aka "index.hbs"
res.render('main', {layout: 'index'})
});


//I would like to use a real api but let's use this for the sake of //the simplicity of the article
// fakeApi = () => 'Faker';
// app.get('/', (req, res) => {
// res.render('main', {layout: 'index', proPlayer: fakeApi()});
// });

app.listen(port, () => console.log(`App listening to port ${port}`));







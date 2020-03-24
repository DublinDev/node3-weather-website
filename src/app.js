const path = require('path');
const express = require('express')
const hbs = require('hbs')

const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sean'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is the help page',
        name: 'Sean'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, response) => {
        if (error) res.send({
            errorMsg: error
        }) 

        forecast(response[1], response[0], (err, resp) => {
            if (error) res.send({
                errorMsg: error
            }) 

            res.send({
                location: req.query.address,
                weather: resp
            }) 
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sean'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404 Page',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Defines path for express configuration
const publicdir = path.join(__dirname, '../public')
/*o*/const viewspath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
/*o*/app.set('views', viewspath)
hbs.registerPartials(partials)

// Setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'vinzmoke-zoro'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'vinzmoke-zoro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        m1: 'forecast not showing',
        m2: 'information not correct',
        name: 'vinzmoke-zoro'
    })
})

app.get('/weather', (req, res) => {
    const add = req.query.address
    if(!add){
        return res.send({error: 'Provide an address first!'})
    }
    geocode(add, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
           res.send({error})
        }
        else{
    forecast(latitude, longitude, (error, forecast) => {
          if(error){
         res.send({error})
        }
          else {
               res.send({
                   location, 
                   forecast
                })  
          }
      })
     }  
   })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: "vinzmoke-zoro"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'vinzmoke-zoro'
    })
})
app.listen(3000, () => {
    console.log('The server is running on port 3000')
})
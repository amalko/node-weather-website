const path = require('path')                //core module- to obtain the path of a file/folder
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//to print the directory path - Debug purpose
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')               //to point the express to the templates folder
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
//setting the 'handlebar' for dynamic web page loading
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//console.log(publicDirectoryPathAbout)

//Set up Static directory to serve
app.use(express.static(publicDirectoryPath))

//dynamic render of a web page
app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Amal'
    })                 //just the name of the hbs file without the file extension
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Amal'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Amal',
        message: 'This is the help page'
    })
})

//helps the server get the info when user tries to access a specific url
// app.get('', (req, res)=>{
//     //sends a response to the user
//     //Rendering an HTML page
//     res.send("<h1>Weather</h1>")
// })

// app.get('/help', (req, res)=>{
//     //res.send('<h1>Help Page</h1>')
//     res.send([{
//         contact_num: '**********',
//         email: 'weatherappcontact@weatherapp.com'
//     },{
//         name: 'Customer service'
//     }])          //object as json data
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address!'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude, location}= {})=>{
            if (error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData)=>{
                if (error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found!!',
        name: 'Amal'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found !!',
        name: 'Amal'
    })
})

//server listens to the port: 3000
app.listen(port, ()=>{
    console.log("Server is up and running on Port " + port)
})
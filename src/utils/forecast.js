const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=9c700ca266ec561c3552a9cc9be812f1&query=' + latitude + ',' + longitude +'&units=f'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("Weather service unavailable!", undefined)
        }
        else if(body.error){
            callback('wrong coordinate!', undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] +". Currently it is "+ body.current.temperature +" degree and there is "+ body.current.precip +" % chance of rain !")
        }
    })
}

module.exports = forecast
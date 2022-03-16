const request = require('request')

const geocode= (address, callback)=>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYW1hbC1rbyIsImEiOiJja3l2aWRhNngwaHowMndzMnp2cTA2dGhuIn0.gn4d4om1Zkw9MLWDmdH7vg&limit=1'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Location service unavailable!', undefined)
        }
        else if (body.features.length === 0){
            callback('Location not found ! Try with other location.', undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
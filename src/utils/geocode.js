const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoidmluem1va2V6b3JvIiwiYSI6ImNrYzV5Z3liajBsdXgycmxxa3dnMjVqaDYifQ.mdpAn5ukVN1rp08K_lUMUg&limit=1'
    request({url, json: true}, (error, {body}) => {
       if(error){
           callback("Unable to connect to the co-ordinate detection service.Please check your Internet connection.", undefined)
       } 
       else if(body.message){
        callback('invalid symbols or name used!', undefined)
       }
       else if(body.features.length == 0){
           callback('Unable to find the location! Provide a valid search term.', undefined)
       }

       else{
        const geopoint = {
            latitude: body.features[0].center[1].toFixed(2),
            longitude: body.features[0].center[0].toFixed(2),
            location: body.features[0].place_name
           }

       callback(undefined, geopoint)

      }
    })
}
module.exports = geocode
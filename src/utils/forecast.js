const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&%20exclude=hourly,daily&appid=62e2df3d86245d8d80de113a4f23f2e2&units=metric'
    request({url, json: true}, (error, {body}) => {
      if(error){
       callback("Unable to connect to the weather service.Please check your Internet connection.", undefined)
      }
      else{
          callback(undefined, body.daily[0].weather[0].description + " throughout the day.<br>Temperature : " + body.current.temp.toFixed(0) + "&deg;C.<br>Humidity : " + body.current.humidity + "%.<br>Pressure : " + body.current.pressure + " mb." + "<br>Dew Point : " + body.current.dew_point + "&deg;C.<br>UV index : " + body.current.uvi + " mWm<sup>-2</sup>.")
      }
  })
} 
module.exports = forecast
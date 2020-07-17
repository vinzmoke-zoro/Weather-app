const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const loc = document.getElementById('address')
const forecast = document.getElementById('weather')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    loc.textContent = 'Loading...'
    forecast.textContent = ''

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if(data.error){
                loc.innerHTML = data.error.fontcolor("red")
            }
            else{
            loc.innerHTML = 'Location : ' + data.location
            forecast.innerHTML = 'Forecast : ' + data.forecast
            }
        })
    })    

})


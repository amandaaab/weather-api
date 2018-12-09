const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const request = require('request')
const fs = require('fs')
const fetch = require('node-fetch')


// Sätter om inställningarna av view engine, till att använda pug.
app.set('view engine', 'pug')

// Använd för att kunna hämta requests från client.
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))


//let weather;

app.get('/', (req, res) => {
  
    res.render('index')
   
})

app.post('/', (req, res) => {
    let cityname = req.body.cityname
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&APPID=52562a5557bda950ff15b910026381f5`;

    request.post(url, (error, response, body) => {
        let json = JSON.parse(body);
        console.log(json);
        let weather = json;


     if(weather.cod === '404') {
            console.log('erroooooooor secound', weather.message)
                        let error = weather.message;
                        res.render('index', {error:`${error}, the city does not exist`})
    } else {
        if(weather.name == undefined){
            res.render('index', {error: "You have to choose a city"})
        } else {
            console.log('heeeej json success', weather.name)
            let name = weather.name;
            let desc = weather.weather;
            let temp = weather.main.temp;

            let icon = desc.map(item => item.icon)
            let item = desc.map(item => item.description)
            let termo;

            if(temp < '1'){
                termo = "fas fa-thermometer-empty"
            }

            if(temp >= '1' && temp <= '5') {
                termo = "fas fa-temperature-low"
            }

            if(temp >= '6' && temp <= '10'){
                termo = "fas fa-thermometer-quarter"
            }

            if(temp >= '11' && temp <= '15'){
                termo = "fas fa-thermometer-half" 
            }

            if(temp >= '16' && temp <= '20') {
                termo = "fas fa-thermometer-three-quarters"
            }
            
            if(temp >= '21'){
                termo = "fas fa-temperature-high"
            }

            res.render('index', {city: name, weather: `Weather status: ${item}`, temp: `${temp}*C`, termo:termo })
        }
    }


      });

     

})

/*

app.post('/', (req, res) => {
    let cityname = req.body.cityname;

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&APPID=52562a5557bda950ff15b910026381f5`;

    fetch(url, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
    }) 

    .then((res) => res.json()) 
    .then((data) => { weather = data })

    if(cityname !== undefined) {
        let celcius = weather.main.temp
        let name = weather.main.name
         res.render('index', {city: cityname, temp: `Temptratur: ${celcius}celcius ` })

    } else {
         res.render('index', {error: "Can't find your city.."})
      
    }



    
})

*/







/*
request('https://openweathermap.org', (err, res, body) => {
    console.log("bodu", body)
})

*/
/*
app.get('/', (req, res) => {
    let url = "https://api.nasa.gov/planetary/apod?api_key=t7emcwbvPeBR3QUOBgFMZoIHjFfcgXLRcPf36boF";
    request(url, (err, response, body) => {
        let object = JSON.parse(body)
       
        let text = object.title;
        
        let newjson = JSON.stringify(text, null, 2)
        fs.writeFileSync('nasa.json', newjson)
        res.send(text)

    })  
})
*/
/*
app.get('/', (req, res) => {

    let url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=52562a5557bda950ff15b910026381f5'
    
    request(url, (err, response, body) => {
        let object = JSON.parse(body)
        console.log('textefdggfdgn', object.list[0].weather)
        res.send('hejejeje')


  //  res.send('hejsan')
})

})
*/

console.log("hej från servern")































app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const request = require('request')
const fs = require('fs')

require('dotenv').config();
let MY_KEY = process.env.API_KEY

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

app.get('/', (req, res) => {
  
    res.render('index')
   
})

app.post('/', (req, res) => {

    let cityname = req.body.cityname
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric${MY_KEY}`;

    request.post(url, (error, response, body) => {
        let json = JSON.parse(body);
        let weather = json;

        if(weather.cod === '404') {
            
            let error = weather.message;

            res.render('index', {error:`${error}, the city does not exist`})

        } else {

            if(weather.name == undefined){

                res.render('index', {error: "You have to choose a city"})

            } else {
            
                let name = weather.name;
                let desc = weather.weather;
                let temp = weather.main.temp;

                let icon = desc.map(item => item.icon)
                let item = desc.map(item => item.description)
                let termo;
                let color;

                if(temp < '1'){
                    termo = "fas fa-thermometer-empty"
                    color = "#729ee5"
                }

                if(temp >= '1' && temp <= '5') {
                    termo = "fas fa-temperature-low"
                    color = "#2f88d6"
                }

                if(temp >= '6' && temp <= '10'){
                    termo = "fas fa-thermometer-quarter"
                    color = "#e88945"
                }

                if(temp >= '11' && temp <= '15'){
                    termo = "fas fa-thermometer-half" 
                    color = "#db5236"
                }

                if(temp >= '16' && temp <= '20') {
                    termo = "fas fa-thermometer-three-quarters"
                    color = "#d63e2a"
                }
                
                if(temp >= '21'){
                    termo = "fas fa-temperature-high"
                    color = "#d32008"
                }

                res.render('index', {city: name, weather: `Weather status: ${item}`, temp: `Temprature ${temp}*C`, termo:termo, color: color })
            }
        }


      });

     

})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
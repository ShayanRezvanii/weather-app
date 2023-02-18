const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:true}))


try {
    app.post('/' , (req ,res) =>{
        const query = req.body.cityName
        const apiKey = "452cbe682c3d98a3f2d29124eaec91d2"
        const url =`https://api.openweathermap.org/data/2.5/weather?q=`+query+'&appid='+apiKey+'&units=metric'
        https.get( url , (response) => {
            response.on('data' , (data) => {
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                console.log(temp);
                console.log(url);

                const discription = weatherData.weather[0].description;
                res.write("<h1>the Temperature in " + query + ' is' + temp + " degree celcius</h1>")
                res.write('<p>the conditon of discription is ' + discription + '<p>')
                res.write('<input type="button" value="Back" onClick="window.location.href=window.location.href">')
            })
            
        })
    })
    
} catch (error) {
    console.log(error);
}
app.get('/' ,(req ,res) => {
    res.sendFile(__dirname + '/index.html');

})


const PORT = process.env.PORT || 3000

app.listen(PORT , () =>{
    console.log(`server is running at ${PORT}`);
})
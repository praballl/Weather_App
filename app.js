const express= require("express")
const https=require("https")
const bodyParser=require("body-parser")

const app= express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
})
app.post("/",function(req,res){
    var cName=req.body.cityName
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cName+"&appid=7b17fbd39f8950c85123318eb7a34532&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData= JSON.parse(data)
            const temprature=weatherData.main.temp
            const dis=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imgURL="<img src=https://openweathermap.org/img/wn/"+icon+"@2x.png>"
            res.write("<h1>The temprature in "+cName+" is "+temprature+" digree celcius.</h1>")
            res.write("<p>and the weather is "+dis+"</p>")
            res.write(imgURL)
            res.send()
        })
    
})
})





app.listen("3000",function(){
    console.log("server is running on port 3000")
})
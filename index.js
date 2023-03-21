const { readFileSync, writeFileSync } = require("fs")
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});


app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

let bmiJSON = "BMI.json"
let rawbmiJSON = readFileSync('BMI.json')
let bmiData = JSON.parse(rawbmiJSON)

app.get('/', function (request, response, bmi){
    // response.render('home', {name: 'John Doe'});
    response.render('body_mass_index');
});

app.post('/process-BMI', urlEncodedParser, function (request, response){
   const weight = request.body.weight
   const height = request.body.height
   const total = request.body
   const BMI = weight / (height * height)
   const completebmi = {...total, bmi: BMI}
   let bmiexplain = ''

   bmiData.push(completebmi);
   writeFileSync(bmiJSON, JSON.stringify(bmiData, null, 2))

    if (BMI < 18.5) bmiexplain = "You are underweight.";
    else if (BMI <= 25 && BMI >= 18.5) bmiexplain = "Your weight is normal.";
    else if (BMI > 25 && BMI < 30) bmiexplain ="You are overweight.";
    else if (BMI  > 30 ) bmiexplain = "You are obese.";


   
    return response.render('bmipage', {BMI, bmiexplain})
   

   
  
});


app.listen(port);
console.log(`Server is listening on ${port}`);


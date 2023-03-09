const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function (request, response){
    // response.render('home', {name: 'John Doe'});
    response.render('contact_us');
});

app.post('/process-contacts', urlEncodedParser, function (request, response){
   response.end('Thankyou' + request.body.first_name + ' ' + request.body.last_name);
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const weight = event.target.elements.weight.value;
  const height = event.target.elements.height.value;
  const bmi = weight / (height * height);
  const bmiInterpretation = getBmiInterpretation(bmi);
  const templateData = { bmi, bmiInterpretation };
  const template = Handlebars.compile(document.querySelector('#bmi-template').innerHTML);
  const result = template(templateData);
  document.querySelector('#result').innerHTML = result;
});

function getBmiInterpretation(bmi) {
  if (bmi < 18.5) {
    return "You are underweight.";
  } else if (bmi < 25) {
    return "Your weight is normal.";
  } else if (bmi < 30) {
    return "You are overweight.";
  } else {
    return "You are obese.";
  }
}

app.listen(port);
console.log('server is listening on port 3000');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrores, errorHandler, boomerrorHandler} = require('./middlewares/error.handlers.js');


const app = express();
const port = 3001;

app.use(express.json()); //middleware

const whitelist = ['http://localhost:8080', 'https://myapp.co']; //lista blanca
const options = {
  origin: function (origin, callback) {
    if(whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors()); //middleware

app.get('/', (req, res) => {
  res.send('Hola mi server en express!');
});

app.get('/Nueva-ruta', (req, res) => {
  res.send('Hola soy nueva ruta!');
});

routerApi(app); //llamamos a la funcion
app.use(logErrores);
app.use(boomerrorHandler);
app.use(errorHandler);
 // el orden es importante


app.listen(port, () => {
  console.log(`Mi port `+port);
});



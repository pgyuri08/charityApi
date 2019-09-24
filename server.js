const express = require('express');//import the package
const app = express();//execute the package
const mongoose = require('mongoose');//connect to db
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Import routes
const postsRoute = require('./routes/api');

app.use('/api', postsRoute); //everytime we go to posts the above specified postRoutes are going to run

//Routes
// app.get('/', (req,res) => {
//   res.send('We are on home');
// });

//Connect to db
mongoose.connect('mongodb://localhost:27017/Charity', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => { //this will help to build up the connection, we will have the mongodb protocol the localhost with default port number and the db name
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err ) }
});

app.listen(3000);

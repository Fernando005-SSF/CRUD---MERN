const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');


//creating an express instance
const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//use to print log messages
app.use(morgan('tiny'));

//mongoDB connection
connectDB(); 

app.use(bodyparser.urlencoded({extended:true}))

//set the view engine
app.set('view engine','ejs')
//if the ejs files are in a seperate folder u have to use this as well
//app.set('views',path.resolve(__dirname,'views/ejs'))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))



//load routes
app.use('/',require('./server/routes/router'));

app.listen(PORT,()=>{console.log(`You are listning to http://localhost:${PORT}`)})
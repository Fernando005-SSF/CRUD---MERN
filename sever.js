const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');


//creating an express instance
const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//use to print log messages
app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({extended:true}))

//set the view engine
app.set('view engine','ejs')
//if the ejs files are in a seperate folder u have to use this as well
//app.set('views',path.resolve(__dirname,'views/ejs'))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))




app.get('/',(req,res) =>{
    res.render('index')
})

app.listen(PORT,()=>{console.log(`You are listning to http://localhost:${PORT}`)})
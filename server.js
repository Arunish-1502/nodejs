const express= require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;

var app=express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('Capital',(text)=>{
  return text.toUpperCase();
});
app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFileSync('server.log',log +'\n');
next();
});
// app.use((req,res,next)=>{
//  res.render('maintainence.hbs');
//});

app.use(express.static(__dirname + '/public'));
app.get('/',(request,response)=>{
  response.render('home.hbs',{
    pageTitle:'Welcome Page',
    welcomeMessage:'Hey! Welcome to the home page'
  });
});
app.get('/about',(request,response)=>{
  response.render('about.hbs',{
    pageTitle:'About Page',

  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  });
});

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});

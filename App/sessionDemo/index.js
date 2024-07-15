const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({secret : 'THISISNOTWHATIWANT' , resave:false , saveUninitialized : false}));

app.get('/register',(req,res)=>
{
    const {username = 'Unknown'} = req.query;
    req.session.username = username;
    res.redirect('/greet');
})

app.get('/greet',(req,res)=>
{
    const {username} = req.session;
    res.send(`Welcome back, ${username}`);
})
app.get('/pageView',(req,res)=>{

    if(req.session.count)
    {
        req.session.count+=1;
    }else 
    {
        req.session.count=1;
    }
    res.send(`YOU VISITED THIS PAGE ${req.session.count} Times`);
})


app.listen(3000,()=>
{
    console.log('OUR SESSIONDEMO SERVING ON PORT 3000');
})
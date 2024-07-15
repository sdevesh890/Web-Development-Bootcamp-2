const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser('yoursecretKey'));
app.get('/greet',(req,res)=>
{
    console.log(req.cookies);
    res.send('HELLO MY NAME IS');
})

app.get('/wiki',(req,res)=>
{
    res.cookie('name','devesh sharma');
    res.cookie('rollno','45');
    res.send('THIS IS COOKIE PAGE!');
})

//VERIFY COOKIE
app.get('/verifyCookie',(req,res)=>
{
    console.log(req.signedCookies);
    res.send(req.signedCookies);
});

//SIGNED COOKIE
app.get('/signedCookie',(req,res)=>
{
    res.cookie('fruit','grape',{signed : true});
    res.send('THIS IS SIGNED COOKIE PAGE');
});
app.listen(3000,()=>
{
    console.log('SERVING!');
})
const express = require('express');
const  app = express();
const Path = require('path');
const redditData = require('./data.json');
// app.use((req , res)=>
// {
//     // console.log("WE GOT THE NEW REQUEST!!!");
//     res.send('<h1>HELLLOO!!! THIS IS OUR RESPONSE</h1>')
// })

app.use(express.static(Path.join(__dirname , 'assets')));

// app.set('view engine','ejs');
app.set('views' , Path.join(__dirname , '/views')); //Recommended
app.get('/',(req,res)=>{
    // res.send('THIS IS MY HOMEPAGE');
    const name = 'Devesh Sharma';
    res.render('home.ejs' , {boy : name});
})
app.get('/cats',(req,res)=>
{
    res.send('MEOW!!!');
})

app.get('/Math',(req,res)=>
{
    const num = Math.floor(Math.random()*10)+1;
    res.render('Math.ejs' , {num});
})

app.get('/r/:subreddit',(req,res)=>
{
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit.ejs',{...data});
    }else 
    {
        res.render('notFound.ejs',{subreddit});
    }
})

app.get('*',(req,res)=>
{
    res.send("I don't know");
})
app.listen(3000 , ()=>{
    console.log("OUR APP IS LISTENING ON 3000 PORT!!!");
})
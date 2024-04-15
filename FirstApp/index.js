const express = require('express');
const  app = express();


// app.use((req , res)=>
// {
//     // console.log("WE GOT THE NEW REQUEST!!!");
//     res.send('<h1>HELLLOO!!! THIS IS OUR RESPONSE</h1>')
// })

app.get('/',(req,res)=>{
    res.send('THIS IS MY HOMEPAGE');
})
app.get('/cats',(req,res)=>
{
    res.send('MEOW!!!');
})

app.get('/dogs',(req,res)=>
{
    res.send('WOOF!!');
})

app.get('/r/:subpath',(req,res)=>
{
    const {subpath} = req.params;
    res.send(`THIS IS THE HOMEPAGE OF ${subpath}`);
})

app.get('*',(req,res)=>
{
    res.send("I don't know");
})
app.listen(3000 , ()=>{
    console.log("OUR APP IS LISTENING ON 3000 PORT!!!");
})
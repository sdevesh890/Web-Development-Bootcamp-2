const express = require("express");
const app = express();
const AppError = require('./AppError');
// app.use((req, res, next) => {
//   console.log("THIS IS MY FIRST MIDDLEWARE");
//   next();
//   console.log('THIS IS MY FIRST MIDDLEWARE AFTER CALLING');
// });
// app.use((req, res, next) => {
//   console.log("THIS IS MY SECOND MIDDLEWARE");
//   next();
//   console.log('THIS IS MY SECOND MIDDLEWARE AFTER CALLING');
// });
// app.use((req, res, next) => {
//   console.log("THIS IS MY THIRD MIDDLEWARE");
//   next();
// });

// fake auth
const verifyPassword = (req,res,next)=>
    {
        const {password} = req.query;
        if(password==="devesh")
            {
               return next();
            }
            // res.send("SORRY , ITS WRONG PASSWORD");
           throw new AppError('Password Required',401); 
    }

    //Route handler
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.get("/dogs",(req, res) => {
  res.send("WOOOF WOOOF");
});

app.get('/admin',(req,res)=>
{
   throw new AppError('You are not admin',403);
})

app.get('/secret',verifyPassword,(req,res)=>
{
   res.send('SORRY , THERE IS NO SECRET HAHAHA!!!');
});

app.use((err,req,res,next)=>
{
   const {status , message} = err;
   res.status(status).send(`Error ${status} - ${message}`);
})

app.listen(5000, () => {
  console.log("CONNECTION OPEN ON PORT 5000");
});

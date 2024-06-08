const express = require("express");
const app = express();

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
            res.send("SORRY , ITS WRONG PASSWORD");
    }

    //Route handler
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.get("/dogs", verifyPassword , (req, res) => {
  res.send("WOOOF WOOOF");
});

app.listen(5000, () => {
  console.log("CONNECTION OPEN ON PORT 5000");
});

const express = require("express");
const app = express();
const path = require("path");
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require('express-session');

mongoose
  .connect("mongodb://127.0.0.1:27017/authDemo")
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("ERROR OCCURED IN MONGOOSE");
  });

app.use(express.urlencoded({ extended: true }));
app.use(session({secret:'THISISSCRET' , 
    resave : false , saveUninitialized : true
}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Login Middleware
const requireLogin =(req,res,next)=>
{
    if(!req.session.user_id)
    {
       return res.redirect('/login');
    }
    next();
}

app.get("/", (req, res) => {
  res.send("WELCOME AUTHENTICATION");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get('/login',(req,res)=>
{
    res.render('login');
})
app.get("/secret", requireLogin , (req, res) => {
   res.render('secret');
});
app.post('/logout',(req,res)=>
{
    // req.session.user_id = null; --> METHOD 1 TO DESTROY A PARTICULAR FIELD OF SESSION
    req.session.destroy(); // METHOD 2 -> A DESTROY FUNCTIONS WHICH DESTROYW WHOLE SESSION
    res.redirect('/login');
})

app.post('/login',async(req,res)=>
  {
      const {password , username} = req.body;
      const result = await User.findAndValidate(username , password);
      if(result)
      {
         req.session.user_id = result._id;
         res.redirect('/secret');
      }else 
      {
        res.redirect('/login');
      }

  })
app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const user = new User({ username, password });
  user.save();
  req.session.user_id = user._id;
  res.redirect("/secret");
});

app.listen(3000, () => {
  console.log("SERVER IS LISTENING ON PORT 3000");
});

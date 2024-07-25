const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const shelterRoutes = require('./Router/shelters');
const adminRoutes = require('./Router/admin');
app.use('/shelter',shelterRoutes);
app.use('/admin',adminRoutes);

//Hash Function
const hashPassword = async(pw)=>
{
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw,salt);
    console.log(salt);
    console.log(hash);
}


const login = async(pw,hashtext)=>
{
     // bcrypt.compare return a boolean value
     const result = await bcrypt.compare(pw,hashtext);
     if(result)
     {
        console.log('Congratulations YOU UNLOCKED THE PASSWORD!!!');
     }else 
     {
        console.log('SORRY PLEASE TRY AGAIN LATER!');
     }
}

// hashPassword('Devesh Sharma');
login('Devesh Sharma','$2b$12$RN9bAHqHAYq0eR6uSODUcOEyhUohb5eFF1G52j4zAg5Ai6gG4K9Om');
// app.use((err, req,res)=>
// {
//     const {message , status} = err;
//     res.status(status).send(message);
// })
app.listen(3000,()=>
{
    console.log('SERVING ON PORT 3000');
})
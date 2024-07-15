const express = require('express');
const app = express();
const shelterRoutes = require('./Router/shelters');
const adminRoutes = require('./Router/admin');
app.use('/shelter',shelterRoutes);
app.use('/admin',adminRoutes);


app.use((err, req,res)=>
{
    const {message , status} = err;
    res.status(status).send(message);
})
app.listen(3000,()=>
{
    console.log('SERVING ON PORT 3000');
})
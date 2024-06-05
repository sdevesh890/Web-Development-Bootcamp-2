const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const methodOverride = require('method-override');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>
{
    console.log('MONGOOSE CONNECTION OPEN!!');
}).catch((err)=>
{
    console.log('MONGOOSE CONNECTION ERROR!!!',err);
})


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const categories = ['fruit','vegetable','dairy','Mushroom','eggs'];

app.get('/Products',async (req,res)=>
{
    const p = req.query;
    console.log(p);
    const products = await Product.find({});
    res.render('products/index',{products});
})

app.get('/Products/new',(req,res)=>
{
    res.render('products/new',{categories});
})

app.post('/Products' , async (req,res)=>
{
    const product = new Product(req.body);
    await product.save();
    res.redirect('/Products');
})


app.get('/Products/:id', async (req,res)=>
{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show',{product});
})

app.get('/Products/:id/edit', async (req,res)=>
{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.render('products/edit',{product,categories});
})

app.put('/Products/:id',async (req,res)=>
{
    const {id} = req.params;
     await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new : true});
    res.redirect('/Products');

})

app.delete('/Products/:id',async(req,res)=>
{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/Products');
})

app.listen(5000,()=>
{
    console.log('APP IS LISTENING ON PORT 5000!');
})
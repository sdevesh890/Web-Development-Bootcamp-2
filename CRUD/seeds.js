const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>
{
    console.log('MONGOOSE CONNECTION OPEN!!');
}).catch((err)=>
{
    console.log('MONGOOSE CONNECTION ERROR!!!',err);
})

// const p = new Product({name:'Grape',price:1.99,category:'fruit'})

// p.save().then((data)=> console.log(data)).catch((e)=>console.log(e));

const seedProduct = [
    {
        name: "Apple",
        price: 1.5,
        category: "fruit"
    },
    {
        name: "Carrot",
        price: 0.5,
        category: "vegetable"
    },
    {
        name: "Milk",
        price: 2.0,
        category: "dairy"
    },
    {
        name: "Banana",
        price: 1.2,
        category: "fruit"
    },
    {
        name: "Broccoli",
        price: 1.8,
        category: "vegetable"
    },
    {
        name: "Cheese",
        price: 3.5,
        category: "dairy"
    }
];

Product.deleteMany({})
.then(res=> console.log('DELETED!!'))
.catch(err => console.log('OOPS !! Error occured'));
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then((res) => console.log("CONNECTIONS OPEN"))
  .catch((err) => console.log("Something went wrong ERROR!!"));

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Winter", "Fall"],
  },
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

  const populate = async()=>
  {
     const farm = await Farm.findOne({}).populate('products');
     console.log(farm);
  }
  
  populate();

const makeFarm = async () => {
  const newFarm = new Farm({ name: "Full Belly Farm", city: "Mumbai" });
  const melon = await Product.findOne({ name: "Goddess Melon" });

  newFarm.products.push(melon);
  const res = await newFarm.save();
  console.log(res);
};

const addProduct = async() => 
{
    const farm = await Farm.findOne({name: 'Full Belly Farm'});
    const watermelon = await Product.findOne({name : 'Suger Baby Watermelon'});
    farm.products.push(watermelon);
    const res = await farm.save();
    console.log(res);
};


// makeFarm();
// Product.insertMany([
//     {
//         name : 'Goddess Melon',
//         price : 4.99 ,
//         season : 'Summer'
//     } ,
//     {
//         name : 'Suger Baby Watermelon',
//         price : 5.66 ,
//         season : 'Summer'
//     },
//     {
//         name : 'Asparagus',
//         price : 3.66 ,
//         season : 'Spring'
//     }
// ]);

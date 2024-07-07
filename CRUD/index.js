const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const methodOverride = require("method-override");
const AppError = require("./AppError");
const ObjectID = require("mongoose").Types.ObjectId;
const Farm = require("./models/Farm");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log("MONGOOSE CONNECTION ERROR!!!", err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy", "Mushroom", "eggs"];

// FARM ROUTES

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("Farm/index", { farms });
});

app.get("/farms/new", (req, res) => {
  res.render("Farm/new");
});

app.post("/farms", async (req, res) => {
  const newFarm = new Farm(req.body);
  await newFarm.save();
  res.redirect("/farms");
});

app.get("/farms/:id", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate('products');
  res.render("Farm/show", { farm });
});

app.get('/farms/:id/products/new',(req,res)=>
{
    const {id} = req.params;
    res.render('products/new',{categories,id});
});

app.post('/farms/:id/products',async(req,res)=>
{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    const {name , price , category} = req.body;
    const product = new Product({name , price , category});
    farm.products.push(product);
    product.farm.push(farm);
    await product.save();
    await farm.save();
    res.redirect(`/farms/${id}`);
})

// PRODUCTS ROUTES
app.get("/Products", async (req, res, next) => {
  try {
    const p = req.query;
    const products = await Product.find({});
    res.render("products/index", { products });
  } catch (error) {
    next(error);
  }
});
app.get("/Products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
      throw new AppError("Invalid Id", 400);
    }
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    res.render("products/show", { product });
  } catch (e) {
    next(e);
  }
});

app.get("/Products/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product, categories });
  } catch (error) {
    next(error);
  }
});

app.put("/Products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect("/Products");
  } catch (e) {
    next(e);
  }
});

app.delete("/Products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/Products");
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const { message = "Something went wrong", status = 500 } = err;
  res.status(status).send(message);
});

app.listen(5000, () => {
  console.log("APP IS LISTENING ON PORT 5000!");
});

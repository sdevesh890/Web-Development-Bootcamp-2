const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=>
{
    console.log('CONNECTION OPEN !!!');
}).catch((error)=>
{
    console.log('error',error);
})

const productSchema  = new mongoose.Schema(
    {
        name : {
            type: String, 
            maxLength : 10
        } ,
        price : 
        {
            type : Number ,
            required : true, 
            default : 500 , 
            min : [0, 'Value must be positive'] , 
            lowercase:true
        } ,
        isSale : 
        {
            type : Boolean
        },
        category: {
            type : [String] , 
            enum : ['Bike','Passion','Safety']
        } , 
        qty : 
        {
            online : 
            {
                type : Number , 
                default : 0
            },
            offline : 
            {
                type : Number , 
                default : 0
            }
        }
    }
)

//Model Instance Method
// productSchema.methods.greet = function()
// {
//     console.log('HELLLOOOO !!!');
//     console.log(this.name);

// }
// productSchema.methods.toggle = function () {
//     this.isSale = !this.isSale
//     this.save();
// }

// productSchema.methods.addcategory = function(newCat)
// {
//     this.category.push(newCat);
//     this.save();
// }


const Product = mongoose.model('Product',productSchema);

const findProduct = async() =>
{
    const findProduct = await Product.findOne({name:'Passion'});
    // console.log(findProduct);
    // await findProduct.toggle()
    // console.log(findProduct);
    await findProduct.addcategory('Passion');
    console.log(findProduct);
}

findProduct();

// const bike = new Product({name: 'Passion' , isSale : true , isAvailabe:false, category : ['Bike'] , qty : {online:1}});

// bike.save().then((data)=> console.log(data)).catch(err => console.log(err))

// Product.findOneAndUpdate({name:'BMW'},{price:-1245},{new:true , runValidators: true})
// .then((data)=> console.log(data))
// .catch(err => console.log(err));

const mongoose = require('mongoose');
const {Schema} = mongoose;

const farmSchema = new Schema({
    name : 
    {
        type : String , 
        required : [true , 'Name Required']
    },
    city : String , 
    email : 
    {
        type : String , 
        required : [true , 'Email Required']
    },
    products : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Product'
        }
    ]
});


farmSchema.pre('')

const Farm = mongoose.model('Farm',farmSchema);

module.exports = Farm;
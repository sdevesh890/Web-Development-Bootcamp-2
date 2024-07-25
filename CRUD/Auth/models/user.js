const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
     
    username : 
    {
        type : String , 
        required : [true , 'Username cannot be blank']
    },
    password : 
    {
        type : String , 
        required : [true , 'Password cannot be blank']
    }
})

userSchema.statics.findAndValidate = async function(username , password)
{
    const user = await this.findOne({username});
    const result = await bcrypt.compare(password,user.password);
    return result ? user : false;
}

userSchema.pre('save', async function(next)
{
    if(!this.isModified('password')) return next(); //Its check whether a particular field is modified or not.

    this.password = await bcrypt.hash(this.password , 12);
    next();
})

const User = mongoose.model('User',userSchema);
module.exports = User;
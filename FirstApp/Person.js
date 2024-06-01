
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=> console.log('CONNECTION OPEN !!!'))
.catch(()=> console.log('ERROR !!!'));


const personSchema = new mongoose.Schema({

    first : String ,
    last : String
})

personSchema.virtual('fullname').get(function()
{
    return `${this.first} ${this.last}`
}).set( function(v)
{
    this.first = v.substr(0, v.indexOf(' '));
    this.last = v.substr(v.indexOf(' ') + 1);
})

personSchema.pre('save', async function()
{
    console.log('SAVING..');
   await new Promise(res => setTimeout(res , 2000));

})

personSchema.post('save', async function()
{
    console.log('JUST SAVED..');
})

const Person = mongoose.model('Person',personSchema);
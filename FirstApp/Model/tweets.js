const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then((res) => console.log("CONNECTIONS OPEN"))
  .catch((err) => console.log("Something went wrong ERROR!!"));


const userSchema = new Schema({
    username : String , 
    age : Number , 
});

const tweetSchema = new Schema({
    text : String , 
    likes : Number ,
    user : [
        {
            type: Schema.Types.ObjectId,
            ref:  'User',
        }
    ]
});

const User =  mongoose.model('User' , userSchema);
const Tweet = mongoose.model('Tweet',tweetSchema);

const findTweet = async()=>
    {
        const tweets = await Tweet.find({}).populate('user');
        console.log(...tweets);
        
    }

    findTweet();


const makeTweet = async()=>
{
    // const user = new User({username : 'sdevesh901' , age : 23 });
    const user = await User.findOne({});
    const tweet = new Tweet({text : 'Rohit Sharma is my favorite batsman', likes : 9990000});
    tweet.user = user;
    await user.save();
    await tweet.save();
}    
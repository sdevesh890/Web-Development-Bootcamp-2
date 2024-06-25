const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then((res) => console.log("CONNECTIONS OPEN"))
  .catch((err) => console.log("Something went wrong ERROR!!"));



const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { _id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({ first: "Devesh", last: "Sharma" });
  u.addresses.push({
    street: "Bodla",
    city: "Agra",
    state: "Uttar Pradesh",
    country: "India",
  });

  const res = await u.save();
  console.log(res);
};

const addAddress = async (id) => 
{
    const user = await User.findById(id);
    user.addresses.push({
        street : 'Dehtora',
        city : 'London',
        state : 'MP' , 
        country : 'UK'
    });
    const res = await user.save();
    console.log(res);
};

addAddress('66769ba13370bd490e6469e4');
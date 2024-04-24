let {v4 : uuid} = require('uuid');
module.exports = [
    {
      id : uuid(), 
      username: "Alice",
      comment: "This is a great article!"
    },
    {
      id : uuid() ,
      username: "Bob",
      comment: "Nice job! Short and sweet."
    },
    {
      id : uuid(),
      username: "Charlie",
      comment: "I agree with Alice, this article is helpful."
    },
    {
      id : uuid() ,
      username: "David",
      comment: "Thanks for sharing this useful information."
    },
    {
      id : uuid(),
      username: "Eva",
      comment: "Simple and to the point. I like it."
    }
  ]
  
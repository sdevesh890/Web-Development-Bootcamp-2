const express = require('express');
const  app = express();
const Path = require('path');
const methodOverride = require('method-override');
const {v4 : uuid} = require('uuid');
const redditData = require('./assets/data.json');
let commentData = require('./assets/comments')

const mongoose  = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
.then(res => console.log('CONNECTION OPEN!!!'))
.catch(err=> console.log('OHH NOO ERROR!!!',err))


const movieSchema = new mongoose.Schema({
    title : String , 
    year : Number , 
    score : Number , 
    rating : String
});

const Movie = mongoose.model('Movie' , movieSchema);

const titanic = new Movie({title : 'Titanic' , year : 1997 , score : 9.2 , rating: 'R'});

// Movie.insertMany([
//         {
//           title: "The Shawshank Redemption",
//           year: 1994,
//           score: 9.3,
//           rating: "R"
//         },
//         {
//           title: "The Godfather",
//           year: 1972,
//           score: 9.2,
//           rating: "R"
//         },
//         {
//           title: "The Dark Knight",
//           year: 2008,
//           score: 9.0,
//           rating: "PG-13"
//         },
//         {
//           title: "Pulp Fiction",
//           year: 1994,
//           score: 8.9,
//           rating: "R"
//         },
//         {
//           title: "Schindler's List",
//           year: 1993,
//           score: 8.9,
//           rating: "R"
//         },
//         {
//           title: "Inception",
//           year: 2010,
//           score: 8.8,
//           rating: "PG-13"
//         }
// ]).then((data)=>
// {
//     console.log('IT WORKED !!');
//     console.log(data);
// }).catch((err)=> console.log('OOPS ERROR!!',err))

// app.use((req , res)=>
// {
//     // console.log("WE GOT THE NEW REQUEST!!!");
//     res.send('<h1>HELLLOO!!! THIS IS OUR RESPONSE</h1>')
// })

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(Path.join(__dirname , 'assets')));

app.set('view engine','ejs');
app.set('views' , Path.join(__dirname , '/views')); //Recommended

app.get('/comments',(req,res)=>
{
    res.render('RestAPI/index.ejs' , {commentData});
})

app.get('/comments/new',(req,res)=>
{
    res.render('RestAPI/new.ejs');
})

app.post('/comments',(req,res)=>
{
    const {username , comment} = req.body;
    commentData.push({username , comment , id:uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>
{
    const {id} = req.params;
    const resfind = commentData.find(x => x.id === id);
    res.render('RestAPI/show.ejs',{resfind});
})

app.get('/comments/:id/edit',(req,res)=>
{
    const {id} = req.params;
    const comment = commentData.find(x => x.id === id);
    res.render('RestAPI/Edit.ejs',{comment});
})
app.patch('/comments/:id' , (req,res)=>
{
    const {id} = req.params;
    const newCommentText = req.body.Username;
    const foundComment = commentData.find(x => x.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id' , (req,res)=>
{
    const {id} = req.params;
    commentData = commentData.filter(x => x.id !== id);
    res.redirect('/comments');
})

app.get('/',(req,res)=>{
    // res.send('THIS IS MY HOMEPAGE');
    const name = 'Devesh Sharma';
    res.render('home.ejs' , {boy : name});
})
app.get('/tacos',(req,res)=>
{
    res.send('GET REQUESTS');
})

app.post('/tacos',(req,res)=>
{
    console.log(req.body);
    res.send('POST REQUESTS')
})

app.get('/Math',(req,res)=>
{
    const num = Math.floor(Math.random()*10)+1;
    res.render('Math.ejs' , {num});
})

app.get('/r/:subreddit',(req,res)=>
{
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit.ejs',{...data});
    }else 
    {
        res.render('notFound.ejs',{subreddit});
    }
})

app.get('*',(req,res)=>
{
    res.send("I don't know");
})
app.listen(3000 , ()=>{
    console.log("OUR APP IS LISTENING ON 3000 PORT!!!");
})
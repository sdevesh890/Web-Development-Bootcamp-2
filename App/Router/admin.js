const express = require('express');
const router = express.Router();
const AppError = require('./AppError');
//Middleware
// router.use((req,res,next)=>
// {
//     const { password } = req.query;
//     if(password == 'devesh')
//         {
//             return next();
//         }
//         res.send('Please type right password');
// })
const verifyPassword = (req, res, next) => {
    const { password } = req.query;

    if(password == 'devesh')
        {
            return next();
        }
        throw new AppError('SORRY YOU ARE NOT ADMIN',400);
}

router.get('/topsecret', verifyPassword ,  (req, res) => {
    res.send('WE ALL KNOW YOUR SECRET!!');
});

router.get('/knoweverything',  (req, res) => {
    res.send('WE KNOW EVERYTHING!');
})

module.exports = router;
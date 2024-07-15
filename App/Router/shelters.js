const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>
{
    res.send('ALL SHELTERSS');
});

router.get('/:id',(req,res)=>
{
    res.send('ONE SHELTERS!!');
});

router.post('/',(req,res)=>
{
    res.send('CREATE SHELTERS!!');
});

router.get('/:id/edit',(req,res)=>
{
    res.send('EDITING SHELTERS!!');
})

module.exports = router;

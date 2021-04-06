const express=require('express')
const controllers =require('../controllers/HandelController');
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('hello from the router')
})
router.get('/crud',controllers.get);
router.post('/crud',controllers.post);
router.delete('/crud/:name',controllers.delete);
router.put('/crud/:name',controllers.put);


module.exports=router
const express=require('express')
const controllers =require('../controllers/HandelController');
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('hello from the router')
})
router.get('/todo',controllers.get);
router.post('/todo',controllers.post);
router.delete('/todo/:name',controllers.delete);
router.put('/todo/:name',controllers.put);


module.exports=router
const express=require('express')
const controllers =require('../controllers/HandelController');
const router=express.Router()

router.get('/',(req,res)=>{
    res.send('hello from the router')
})
router.get('/crudget',controllers.get);
router.post('/crudpost',controllers.postRigester);
router.post('/crudlogin',controllers.postLogin);
router.get('/crudlogout',controllers.Logout);
router.delete('/crudDelete/:name',controllers.delete);
router.put('/crudput/:name',controllers.put);


module.exports=router
import express from "express"
import {registerController,
      loginController,testController,
       forgotPasswordController,
       updateProfileController,
       orderController,
       getAllOrders,
       statusController
      } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";



const router=express.Router()

// register 

router.post('/register',registerController);

router.post('/login',loginController);

router.post('/forgot-password',forgotPasswordController);

router.get('/test',requireSignIn,isAdmin, testController);


//user route *********************************************************************
router.get('/user-auth', requireSignIn, (req,res)=>{
      res.status(200).send({ok:true});
})


//admin routes*********************************************************************
router.get('/admin-auth', requireSignIn,isAdmin,(req,res)=>{
      res.status(200).send({ok:true});
})

//update profile 
router.put('/profile',requireSignIn,updateProfileController)


// orders
router.get('/orders',requireSignIn,orderController)


//Admin orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrders)

//order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,statusController)



export default router
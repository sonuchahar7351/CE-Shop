import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn=async(req,res,next)=>{
     try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWt_SECRET)
        req.user=decode;
        next()
     } catch (error) {
      console.log("middleware",error);
      res.send({
            success:false,
            error,
            message:"error in admin middleware"
      })
     }
}


export const isAdmin=async(req,res,next)=>{
      try {
           const user= await userModel.findById(req.user._id);
           if(!user.role==1){
            return res.status(401).send({
                  success:false,
                  message:"invalid access"
            })
           }
           next();
            
      } catch (error) {
            
            console.log("error",error)
      }
}
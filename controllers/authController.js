import { comparePassword, hashPassword} from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';



// regiseter controller ***********************************************************************************

 export const registerController=async(req,res)=>{

      try {
            const {email,name,password,phone,address,answer}=req.body;
          if([name,email,password,phone,address,answer].some((field)=>field?.trim()==="")){
            return res.send({message:"all fields are required"});
          }

          // existing user **************

          const existuser= await userModel.findOne({email});
          
          if(existuser){
             return res.status(200).send({
                  success:false,
                  message:"already reigister please login"
             })
          }

          // register user *************


          const hashedPassword = await hashPassword(password);

          const user = await new userModel({name,email,phone,address,answer,password:hashedPassword}).save();
          res.status(200).send({
             success:true,
             message:"user register successfully",
             user
          })

      } catch (error) {
            console.log("some error with controllers",error);
            res.status(500).send({
                  success:false,
                  message:"error in registration",
                  error
            })
      }

};


// login controller *******************************************************************************88

export const loginController=async(req,res)=>{

      try {
            const {email,password}=req.body
            if(!email || !password){
                  return res.status(404).send({
                        success:false,
                        message:"invalid email or password"
                  })
            }
         const user=await userModel.findOne({email});
         if(!user){
         return res.status(404).send({success:false,message:"email is not register"})
         }   
       const match=await comparePassword(password,user.password);
       if(!match){
            return res.status(200).send({success:false,message:"imvalid password"})
       }

   const token =await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).send({
            success:true,message:'login successfully',
            user:{
                  name:user.name,
                  email:user.email,
                  phone:user.phone,
                  address:user.address,
                  role:user.role,
            },
            token,
        })


      } catch (error) {
            console.log(error)
          
      }

}


// forgotpassword controller *************************************************************************

 export const forgotPasswordController=async(req,res)=>{
   
      try {
            const {email,answer,newPassword}=req.body
            if(!email){
                  res.status(400).send({
                        message:'email is required'
                  })
            }
            if(!answer){
                  res.status(400).send({
                        message:'answer is required'
                  })
            } if(!newPassword){
                  res.status(400).send({
                        message:'newPassword is required'
                  })
            }

            const user=await userModel.findOne({email,answer})

             if(!user){
                  return res.status(403).send({
                        success:false,
                        message:'wrong email or answer'
                  })
             }

             const hashed=await hashPassword(newPassword)
             await userModel.findByIdAndUpdate(user._id,{password:hashed})
             res.status(200).send({
                  success:true,
                  message:"password reset successfully"
             })

      } catch (error) {
            console.log(error);
            res.status(400).send({
                  success:false,
                  message:'something went wrong',
                  error
            })
      }

 }

export const testController=(req,res)=>{
     res.send({message:"protected route"});
}


// update profile 
export const updateProfileController = async(req,res)=>{
      try {
            const {email,name,phone,password,address}=req.body
            const user = await userModel.findById(req.user._id)

           if(password && password.lenght < 6){
            return res.json({error:'password is required and 6 character long'})
           }
           const hashPSW = password ? await hashPassword(password) : undefined
           const updateUser = await userModel.findByIdAndUpdate(req.user._id,{
            name:name || user.name,
            password:hashPSW || user.password,
            phone:phone || user.phone,
            address:address || user.address
           },{new:true})
           res.status(200).send({succuss:true,message:'profile update succussfully',updateUser})

      } catch (error) {
            res.status(500).send({success:false,message:'error while updating',error})
            console.log(error);
      }
}



//get all orders
export const orderController=async(req,res)=>{
      try {
            const orders=await orderModel.find({buyer:req.user._id}).populate('products').populate('buyer','name')
            res.json(orders)
      } catch (error) {
            res.status(500).send({success:false,message:'error in order getting',error})
            console.log(error)
            
      }
}

//admin get all orders
export const getAllOrders=async(req,res)=>{
      try {
            const orders=await orderModel.find()
            .populate('products')
            .populate('buyer','name')
            .sort('createdAt -1')

            res.json(orders)
            
      } catch (error) {
            res.status(500).send({success:false,message:'error in order getting',error})
            console.log(error)
            
      }
}

//order status
export const statusController = async(req,res)=>{
      try {

            const {orderId}=req.params;
            const {status}=req.body;
            const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
            res.json(orders);
            
      } catch (error) {
            Console.log(error);
            res.status(400).send({succuss:false,message:'error while changing status',error})
      }
}
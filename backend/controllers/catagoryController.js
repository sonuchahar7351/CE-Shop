import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req,res) =>{
      try {

            const {name}=req.body
            if(!name){
                  return res.status(401).send({message:'Name is required'})
            }
            const existingCategory=await categoryModel.findOne({name})
            if(existingCategory){
                  return res.status(200).send({success:true, message:'catergor already exists'})
            }

            const category = await new categoryModel({name, slug:slugify(name)}).save()

            res.status(201).send({success:true,message:'new category created', category})
            
      } catch (error) {
            console.log('category controller error');
            res.status(500).send({
                  success:false,
                  error,
                  message:'error in category'
            })
      }
};

// update category ******************************************************************

export const updateCategoryController = async(req,res)=>{
       try {
            const {name}=req.body
            const {id}=req.params
            const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
            res.status(200).send({success:true,message:'category updated succussfully',category});
            
       } catch (error) {
            console.log(error);
            res.status(500).send({success:false, error, message:'error while updating'})
       }
}

//**************************** get all category ******************************* */

export const categoryController = async(req,res)=>{

      try {

            const category= await categoryModel.find({})
            res.status(200).send({success:true,message:'All Category List', category});
            
      } catch (error) {
            console.log(error);
            res.status(500).send({success:false, error, message:'error while getting all categories'})
      }

}

//*********************************************single category getter */

export const singelCategoryController=async(req,res)=>{
      try {
           
            
            const category =await categoryModel.findOne({slug:req.params.slug})
            res.status(200).send({
                  success:true,
                  message:'get single category successfully',
                  category
            })

      } catch (error) {
            console.log(error)
            res.status(500).send({success:false, message:'single category not found',error})
      }
}


export const deleteCategoryController = async(req,res)=>{
      try {
             const {id}=req.params
             const category=await categoryModel.findByIdAndDelete(id)
             res.status(200).send({succes:true,message:'category deleted successfully', category})
      } catch (error) {
           console.log(error)
           res.status(500).send({success:false,message:'can not delete category ',error}) 
      }
}
import mongoose from "mongoose";


const conncetDB=async()=>{
      try {
           const conn=await mongoose.connect(process.env.MONGO_URI);
           console.log("connected to database ",conn.connection.host)
      } catch (error) {
            console.log("something went wrong with database connection")
      }
   
}
export default conncetDB;
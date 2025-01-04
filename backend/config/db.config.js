
import mongoose from "mongoose";
 

const connectDB = async()=>{

    await mongoose.connect(process.env.DATABASE_URL,{}).then((data)=>{

        console.log("database connection established");


    }).catch((error)=>{

        console.error("database connection failed",error);


    })
}

export default connectDB;


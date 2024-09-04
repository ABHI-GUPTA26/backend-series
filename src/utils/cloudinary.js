import { v2 as cloudinary } from "cloudinary";
import  fs from "fs";// this is nodejs libary used to fille reead write upload and more thing


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME, 
    api_key: process.env.CLOUDINARY_CLIENT_API, 
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
  });

  const cloudinaryFileUpload = async (filePath)=>{
    try{
        if(!filePath) return null;
        //now upload the file
         const response=await cloudinary.uploader.upload(filePath,{
            resource_type:auto //khud samchho ki kaun si file aa rahi hai
            // vo image hai ya video 
            
        })
        //file hss been uploaded successfull 
        console.log("file is uploaded successfully :",response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(filePath) //remove the locally tempary saved file as the upload optin is failed
           return null;

    }
  }
   export {cloudinaryFileUpload}
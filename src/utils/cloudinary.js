import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: 'dprmfmiw7', 
    api_key:'343499326942178' , 
    api_secret: 'u1_stu9lHc3WEff66Q7LHKOKmcs'
});
//console.log(process.env.CLOUDINARY_CLIENT_NAME, process.env.CLOUDINARY_CLIENT_API, process.env.CLOUDINARY_CLIENT_SECRET);


const cloudinaryFileUpload = async (filePath) => {
    try {
        if (!filePath){
            console.log("File is not found")
            return null;
        } 

        // Now upload the file
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto" // Automatically detect the file type (image, video, etc.)
        });

        console.log("This is response", result);
        console.log("file is uploaded successfully:", result.url);
        fs.unlinkSync(filePath);
        return result;
    } catch (error) {
        console.error("Upload error:", error);

        // Remove the locally temporary saved file as the upload option has failed
        try {
            fs.unlinkSync(filePath);
        } catch (unlinkError) {
            console.error("Error deleting the file:", unlinkError);
        }

        return null;
    }
};

export { cloudinaryFileUpload };

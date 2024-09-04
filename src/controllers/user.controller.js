import { asynchandler } from "../utils/asynchandeller.js";
import  {apiError}  from "../utils/apiError.js";
import  {User}    from "../models/User.model.js";
import  {cloudinaryFileUpload} from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
const userRegister= asynchandler(async (req,res)=>{
        // frontend se data lena hai
        //jab bhi koi data frontend form ya object se le rahe honge to req.body se 
        //mil jayegi
        //aur url se aaa  rahihai to usko ham bad me dekhenge
   const {email,fullName,userName,password}=req.body
   console.log("email :", email )

   //validate 
     /*if(email===""){
      throw new apiError(400,"all fields are required !")
   }
   if(fullName===""){
      throw new apiError(400,"all fields are required !")
   }  */
     
     /// we can use some method instead of checking one by one  
     //  if any one of is emprty respone will excute  
      if([email,userName,fullName,password].some((field)=>
      field?.trim()==="") ){
         throw new apiError(400, "all fields are reqired !")
      }  
  ///check  if already exist or not
      
  const userExist=  User.findOne(
   {
      $or:[{userName},{email}]
   }
  )

    if(userExist){
       throw new apiError(409,"userName or eamil is already exist !");
    }
   //  check for images   /check for avtar
        const avatarLocalPath=req.files?.avatar[0]?.path
        const coverImageLocalPath=req.files?.avatar[0]?.path
        if(!avatarLocalPath){
         throw new apiError(400,"avatar file is required !")
        }
        //upload on cloudinary avatar and coverimage

       const avatar= await cloudinaryFileUpload(avatarLocalPath)
       const coverImage= await cloudinaryFileUpload(coverImageLocalPath)
          if(!avatar){
            throw new apiError(400,"avatar file is required !")
          }
          // object creation
          const user=await User.create({
              fullName,
              avatar:avatar.url,
              coverImage:coverImage?.url||"",
              email,
              userName:userName.toLowerCase(),
              password

          })
          //remoove password and refreshToken 
          const createdUser=await User.findById(user._id).select(
            "-password -refreshToken"
          )
          if(!createdUser){
            throw new apiError(500,"something went wrong during registering the user")
          }

          return res.status(200).json(
              new apiResponse(200,createdUser,"user registered successfully !")
          )


})

export {userRegister}

import mongoose, {Schema,model} from "mongoose";//here we destructured model and Schema
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema=new Schema ( 
    
    {
       userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true

       },
       email:{
        type:String,
        required:true,
        unique:true,
        trim:true
        

       },
       fullName:{
        type:String,
        required:true,
        
        trim:true,
        index:true

       },
       avatar:{
        type:String , ///this will coome from cloudinary
        required:true
       },
       coverImage:{
        type:String
       },
       watchHistory:[
        {
        type:Schema.Types.ObjectId,
        ref:"Video"

       }],
       password:{
        type:String,
         required:true,
         unique:true
       },
       refressToken:{
        type:String
       }
       
    }
    ,{timestamps:true})

    userSchema.pre("save",async function(next){
        if(! this.isModified("password")) return next();
        this.password= await bcrypt.hash(this.password,10)
          next()
    })
    userSchema.methods.isCorrectPassword= async function(password){
        return await bcrypt.compare(password,this.password);
    }  /// we can make our own methods using methods

    userSchema.methods.generateAccessToken= function(){
        return jwt.sign({
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
         },process.env.ECCESS_TOKEN_SECRET,{
            expiresIn:process.env.ECCESS_TOKEN_EXPIRY
         })
    }
    userSchema.methods.generateRefreshToken= function(){
        return jwt.sign({
            _id:this._id
           
         },process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
         })
    }

     export const User=model("User",userSchema);
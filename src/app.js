import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,
    limit:"16kb"
}))// object ke ander object aa raha hai to extended ka use karte hai
app.use(express.static("public"))// iska use ham like koi file or folder koi apne server por store karna chate hai to configure karte hai
app.use(cookieParser())


///routes import
  import userRouter from "./routes/user.routes.js";
   app.use("/api/v1/users",userRouter);//  achhi practice e liye is tarah se likhateh ai
   //iska matalab api ka version 1

export {app};


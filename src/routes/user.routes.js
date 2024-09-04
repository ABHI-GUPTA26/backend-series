import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";
 import { upload } from "../middlewares/multer.middleware.js";
const router =Router();
   
 router.route("/register").post(
    upload.fields([
            {
                name:"avtar",
                maxCount:1
            },
            {
                name:"coverImage",
                maxCount : 1
            }
    ]),  //  field ka matalb ki different type ki file(png,jpg,pdf) ham le sakte hai 
    //agar arry use karte to same type ka lena padta dono
    userRegister
)
 
export default router;
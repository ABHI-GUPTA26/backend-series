import dotenv from 'dotenv';
import  mongoose from "mongoose"
import express from "express"
import {DB_name} from "./constants.js"
import dbConnection from "./database_connections/DB.connection.js"
import { app } from './app.js';

dotenv.config({ path: "./.env" });


  const port  =process.env.PORT||8000;
dbConnection()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR:",error)
        throw error
    })
      app.listen(port,()=>{
        console.log(`app is listening at port no : ${port}`);
      })
})
.catch((error)=>{
    console.log(`mongodb connectionis failed !!`,error);
})







/*(async()=>{
    try{
        await mongoose.connection(`${process.env.MONGODB_URL}/${DB_name}`)
        app.on("error",(error)=>{
            console.log("error:",error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`server  is listening st port no :${process.env.PORT} `)
        })
    }
    catch(error){
        console.error("error:",error)
        throw error

    }
})()*/

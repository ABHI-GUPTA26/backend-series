import dotenv from 'dotenv';
dotenv.config({ path: "./env" });
import  mongoose from "mongoose"
import express from "express"
import {DB_name} from "./constants.js"
import dbConnection from "./database_connections/DB.connection.js"

const app =express()

dbConnection();

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

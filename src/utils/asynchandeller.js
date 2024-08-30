       ///promise resolve method
const asynchandler=(requesthandler)=>(req,res,next)=>{
    Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
}

      /// this try and catch method both are usedin production 
/*const asynchandler=(func)=>async(err,req,res,next)=>{
    try{
        await func(err,req,res,next);
    }
    catch(error){
          res.status(err.code||500).json({
             success:true,//  use for frontend user 
             message:err.message
          })
    }

}*/
export {asynchandler}
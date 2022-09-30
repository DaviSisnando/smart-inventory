import { Request ,Response,NextFunction } from "express";
import { decode,verify } from "jsonwebtoken";


interface IPayload {
    sub: string;
  }


  export function ensureAuthenticated(request:Request,response:Response,next:NextFunction){
       
    const authHeaders  = request.headers.authorization

    if(!authHeaders){
        return response.status(401).json({ error: "Token is missing" });
    }
    const [, token] = authHeaders.split(" ");
    
    try{
      const{sub}= verify(token,process.env.AUTH_SECRET) as IPayload
      
      request.user_id=sub
      
    
      return next()
    
    }catch(err){
        return response.status(401).end();
    }
       
  }

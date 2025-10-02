// Authorization: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.

import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
dotenv.config({})

export const generateToken=(res,user,message)=>{
    const token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});
    return res.status(200).cookie("token",token,{httpOnly:true,sameSite:'strict',maxAge:24*60*60*1000}).json({
        success:true,
        message,
        user
    })
}
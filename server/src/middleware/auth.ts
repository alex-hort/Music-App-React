import PasswordResetToken from "#/models/passwordResetToken";
import { RequestHandler } from "express";


export const isValidPasswordResetToken: RequestHandler = async (req, res, next) => {
    
  const {token, userId} = req.body;

  const resetToken =  await PasswordResetToken.findOne({owner: userId});
  
  if(!resetToken){
    return res.status(403).json({message: "Unauthorized access"});
  }

  const matched = await resetToken.compareToken(token);
  if(!matched){
    return res.status(403).json({message: "Unauthorized access"});
  }

  next();


}
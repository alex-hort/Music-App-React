import PasswordResetToken from "#/models/passwordResetToken";
import { JWT_SECRET } from "#/utils/variables";
import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import User from "#/models/user";
import { isValidObjectId, Types } from "mongoose";

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


export const mustAuth: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(403).json({ error: "Unauthorized request!" });
    }

    const payload = verify(token, JWT_SECRET) as JwtPayload;
    const id = payload.userId;


    if (!isValidObjectId(id)) {
      return res.status(403).json({ error: "Invalid token payload" });
    }

    
    const user = await User.findOne({
      _id: new Types.ObjectId(id),
      tokens: token,
    });

    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }

   
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user.avatar?.url,
      followers: user.followers.length,
      followings: user.following.length,
    };

    req.token = token;

    next();
  } catch (error) {

    res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const isVerified: RequestHandler = async (req, res, next) => {

  if(!req.user?.verified)return res.status(403).json({error: "Please verify your email to access this resource"})

    next();
}
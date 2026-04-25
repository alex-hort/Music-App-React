import User from "#/models/user";
import { CreateUser, VerifyEmailRequest } from "#/@types/user";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { sendForgetPasswordLink, sendPasswordResetSuccessEmail, sendVerificationEmail } from "#/utils/mail";
import { formatProfile, generateToken } from "#/utils/helper";
import EmailVerificationToken from "#/models/emailVerification";
import { isValidObjectId, Types } from "mongoose";
import PasswordResetToken from "#/models/passwordResetToken";
import crypto from "crypto";
import { JWT_SECRET, PASSWORD_RESET_LINK } from "#/utils/variables";
import { RequestWithFiles } from "#/middleware/fileParser";
import cloudinary from "#/cloud";
import formidable from "formidable";



//controller to create a new user
export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ name, email, password });

  // send verification email
  const token = generateToken();
  await EmailVerificationToken.create({
    owner: new Types.ObjectId(user._id.toString()),
    token,
  });

  sendVerificationEmail(token, { name, email, userId: user._id.toString() });

  res.status(201).json({ user: { id: user._id, name, email } });
};




//controller to verify user's email
export const verifyEmail: RequestHandler = async (req: VerifyEmailRequest, res) => {
  const {token,userId} = req.body;

  const verificationToken = await EmailVerificationToken.findOne({owner: userId});
  
  if(!verificationToken){
    return res.status(403).json({message: "Invalid or expired token"});
  }


  const matched = await verificationToken?.compareToken(token);

   if(!matched){ return res.status(403).json({message: "Invalid or expired token"});
  }

  await User.findByIdAndUpdate(userId, {verified: true});

  await EmailVerificationToken.findByIdAndDelete(verificationToken._id);
  
  res.status(200).json({message: "Email verified successfully"});

}

//controller to resend email verification token
export const sendReVerificationToken: RequestHandler = async (req, res) => {

  const {userId} = req.body;

  if(!isValidObjectId(userId)){
  return res.status(403).json({message: "Invalid user ID"});
}

  const user = await User.findById(userId);
  if(!user)return res.status(403).json({message: "User not found"});

  await EmailVerificationToken.findOneAndDelete({owner: userId});

  const token = generateToken();

 await EmailVerificationToken.create({owner: userId, token});


 sendVerificationEmail(token, {
  name: user?.name ,
  email: user?.email,
  userId: user?._id.toString()
 });
 
 res.status(200).json({message: "Verification email sent successfully"});

}

export const generateForgetPasswordLink: RequestHandler = async (req, res) => {
    
  const {email} = req.body;

  const user =await User.findOne({email})

  if(!user)return res.status(403).json({message: "Account not found"});

  //generate the link
  //https://podify.com/reset-password?token=1234567890&userId=1234567890

  await PasswordResetToken.findOneAndDelete({owner: user._id});
  const token = crypto.randomBytes(36).toString("hex");

  
  await PasswordResetToken.create({
    owner: new Types.ObjectId(user._id.toString()),
    token
  })
  const resetLink = `${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id.toString()}`;

  sendForgetPasswordLink({
  email: user.email,
  link: resetLink
});

  res.json({message: "Password reset link generated successfully", resetLink});


}


export const isValidPasswordResetToken: RequestHandler = async (req, res) => {
    
  const {token, userId} = req.body;

  const resetToken =  await PasswordResetToken.findOne({owner: userId});
  
  if(!resetToken){
    return res.status(403).json({message: "Unauthorized access"});
  }

  const matched = await resetToken.compareToken(token);
  if(!matched){
    return res.status(403).json({message: "Unauthorized access"});
  }

  res.status(200).json({message: "Valid token"});

}



export const grantValid: RequestHandler = async (req, res) => {

  res.json({valid: true});
    

}


export const updatePassword: RequestHandler = async (req, res) => {

  const {password, userId} = req.body;

  const user = await User.findById(userId);
  if(!user)return res.status(403).json({message: "Unauthorized access"});


  const matched = await PasswordResetToken.findOne({owner: userId});

  if(!matched){
    return res.status(422).json({message: "The token is invalid or has expired"});
  }

  user.password = password;
  await user.save();


  await PasswordResetToken.findOneAndDelete({owner: userId})
  //send the success email notification to the user
  sendPasswordResetSuccessEmail(user.name, user.email);
  res.status(200).json({message: "Password updated successfully"});
  
}

export const signIn: RequestHandler = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({
    email
  })

  if(!user)return res.status(403).json({error: "Email.Password mismatch"});

  //comprare the password
  const matched = await user.comparePassword(password)
  if(!matched)return res.status(403).json({error: "Email.Password mismatch"});
  //generate a token and send to the client

  const token = jwt.sign({userId: user._id}, JWT_SECRET);
  user.tokens.push(token)

  await user.save()


  res.json({profile: {id: user._id, name: user.name, email: user.email, verfified: user.verified, avatar: user.avatar?.url, followers: user.followers.length, following: user.following.length}, token});

}

export const updateProfile: RequestHandler = async (req: RequestWithFiles, res) => {

  const {name} = req.body;
  const avatar = req.files?.avatar as formidable.File;
  const user = await User.findById(req.user.id)

  if(!user) throw new Error("something went wrong, user not found")

  if(typeof name === "string")return res.status(422).json({message: "Name must be a string"});

  if(name.trim().lenght < 3) return res.status(422).json({error: "Invalid namee"})

  user.name = name;

  if(avatar){

    if(user.avatar?.public_id){
      await cloudinary.uploader.destroy(user.avatar?.public_id);
    }
    
   const {secure_url, public_id} = await cloudinary.uploader.upload(avatar.
    filepath, {
    width: 300,
    height: 300,
    crop: "thumb",
    gravity: "face"
   })

  user.avatar = { url: secure_url, public_id: public_id }
  }

  await user.save()

  res.json({profile: formatProfile(user)});

}

export const sendProfile: RequestHandler = async (req, res) => {
  res.json({profile: req.user})
}


export const logOut: RequestHandler = async (req, res) => {
  try {
    const { fromAll } = req.query;
    const token = req.token;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   
    if (fromAll === "yes") {
      user.tokens = [];
    } else {
      user.tokens = user.tokens.filter((t) => t !== token);
    }

    await user.save();
    res.json({ success: true });
    
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
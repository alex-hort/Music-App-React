import { UserDococument } from "#/models/user";

export const generateToken = (length: number=6) => {
    //declare a variable 
    let otp = ""

    for(let i =0; i<length; i++){
        const diigit = Math.floor(Math.random() * 10);
        otp += diigit;
    }
    return otp;
}

export const formatProfile = (user: UserDococument) => {
    return {
  id: user._id,
  name: user.name,
  email: user.email,
  verified: user.verified,
  avatar: user.avatar?.url,
  followers: user.followers.length,
  followings: user.following.length,
};


}
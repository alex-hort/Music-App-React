//interface
import { compare, hash } from "bcrypt";
import {Model, model, ObjectId, Schema, Types } from "mongoose";

export interface UserDococument{
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    verified: boolean;
    avatar?: {url: string, public_id: string};
    tokens: string[];
    favorites: Types.ObjectId[];
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
}

interface Methods{
    comparePassword(password: string): Promise<boolean>;
}


const userSchema = new Schema<UserDococument, Model<UserDococument, {}, Methods>, Methods>({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        
    },

    avatar:{
        type: Object,
        url: String,
        publicId: String
    },
    verified:{
        type: Boolean,
        default: false
    },

    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Audio"
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    tokens: [String]

}, {timestamps: true});


userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  this.password = await hash(this.password, 10);

});

userSchema.methods.comparePassword = async function (password) {
    const result = await compare(password, this.password);
    return result;

};

export default model<UserDococument, Model<UserDococument, {}, Methods>>(
  "User",
  userSchema
);
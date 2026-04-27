import * as yup from "yup";

import { isValidObjectId } from "mongoose";
import EmailVerificationToken from "#/models/emailVerification";
import { categories } from "./audio_category";

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name is too long"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is missing")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase and number"
    )
});

export const TokenAndIDValidation = yup.object().shape({
  token: yup.string().required("Token is required"),
  userId: yup
    .string()
    .transform(function (value) {
      if(this.isType(value) && isValidObjectId(value)) return value;
      return "";
    })
    .required("User ID is required")
});





export const UpdatePasswordSchema = yup.object().shape({
  token: yup.string().required("Token is required"),
  userId: yup
    .string()
    .transform(function (value) {
      if(this.isType(value) && isValidObjectId(value)) return value;
      return "";
    })
    .required("User ID is required"),
    password: yup
    .string()
    .required("Password is missing")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase and number"
    )
});


export const SignInVerificationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().trim().required("Password is missing")
})

export const AudioValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  about: yup.string().required("About is required"),
  category: yup.string().oneOf(categories, "Invalid category").required("Category is missing")
})

export const NewPlaylistValidationSchema = yup.object().shape({
  title: yup.string().required("Title is missing"),
  resId: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : ""
  })
  ,
  visibility: yup
  .string().oneOf(["public", "private"], "Visibility must be either 'public' or 'private'")
  .required("Visibility is missing")

})

export const OldPlaylistValidationSchema = yup.object().shape({
  title: yup.string().required("title is missing"),
  item: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : ""
  }),
  id: yup.string().transform(function (value) {
    return this.isType(value) && isValidObjectId(value) ? value : ""
  }),
  visibility:  yup
  .string().oneOf(["public", "private"], "Visibility must be either 'public' or 'private'")
})
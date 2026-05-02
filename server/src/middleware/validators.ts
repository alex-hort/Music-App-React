import { RequestHandler } from "express";
import * as yup from "yup";

export const validate = (schema: any): RequestHandler => {
  return async (req, res, next) => {
    if (!req.body) {
      return res.status(422).json({ error: "empty body is not allowed" });
    }
    const schemaToValidate = yup.object({
      body: schema
    });
    try {
      await schemaToValidate.validate(
        {
          body: req.body
        },
        {
          abortEarly: false
        }
      );
      next(); 
    } catch (err) {

      if (err instanceof yup.ValidationError) {
        return res.status(422).json({
          errors: err.errors
        });
      }
      next(err); 
    }
  };
};
    
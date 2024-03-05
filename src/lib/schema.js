import { getCharacterValidationError } from "./utils";
import * as yup from "yup";

export const signUpSchema = yup.object().shape({
    fullname: yup.string().required("Field is required"),
    email: yup.string().email("Invalid email").required("Field is required"),
    password: yup
      .string()
      .required("Field is required")
      .min(6, "Password must have at least 6 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[Link-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  });

  export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Field is required"),
    password: yup
      .string()
      .required("Field is required")
      .min(6, "Password must have at least 6 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[Link-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  });

  export const emailSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Field is required"),
  });


  export const updatePasswordSchema = yup.object().shape({
    password: yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    cpassword: yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("password")], "Passwords do not match")
  });

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
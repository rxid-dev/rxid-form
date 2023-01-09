import { ValidatorFn } from "../../core/form/type/ValidationFN";
import { regexValidator } from "./regex.validator";
export const emailValidator = (
  message: string = "Alamat email tidak valid"
): ValidatorFn => {
  // pattern source: stackoverflow
  // answer by: MonkeyZeus
  // last access: January, 10 2023; 01:43
  // url: https://stackoverflow.com/a/60282793
  const pattern = `^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$`;
  return regexValidator(pattern, message);
};

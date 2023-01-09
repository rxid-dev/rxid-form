import { ValidationError } from "../../core/form/type/ValidatioError";
import { ValidatorFN } from "../../core/form/type/ValidationFN";
export const minLengthValidator = (
  minLength: number,
  message: string
): ValidatorFN => {
  return (value): ValidationError => {
    if (value) {
      if (value.length < minLength) {
        return { message };
      }
    }
    return null;
  };
};

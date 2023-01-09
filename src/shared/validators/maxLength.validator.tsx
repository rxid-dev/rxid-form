import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const maxLengthValidator = (
  maxLength: number,
  message: string
): ValidatorFn => {
  return (value): ValidationError => {
    if (value) {
      if (value.length > maxLength) {
        return { message };
      }
    }
    return null;
  };
};

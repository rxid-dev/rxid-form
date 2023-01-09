import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const minLengthValidator = (
  minLength: number,
  message: string
): ValidatorFn => {
  return (value): ValidationError => {
    if (value) {
      if (value.length < minLength) {
        return { message };
      }
    }
    return null;
  };
};

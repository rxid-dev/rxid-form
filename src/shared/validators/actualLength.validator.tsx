import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const actualLengthValidator = (
  actualLength: number,
  message: string
): ValidatorFn => {
  return (value): ValidationError => {
    if (value) {
      if (value.length !== actualLength) {
        return { message };
      }
    }
    return null;
  };
};

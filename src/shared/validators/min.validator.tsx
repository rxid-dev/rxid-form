import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const minValidator = (min: number, message: string): ValidatorFn => {
  return (value): ValidationError => {
    if (value) {
      if (+value < min) {
        return { message };
      }
    }
    return null;
  };
};

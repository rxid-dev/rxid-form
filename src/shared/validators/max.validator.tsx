import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const maxValidator = (max: number, message: string): ValidatorFn => {
  return (value): ValidationError => {
    if (value) {
      if (+value > max) {
        return { message };
      }
    }
    return null;
  };
};

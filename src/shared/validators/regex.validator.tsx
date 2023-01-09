import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const regexValidator = (
  patern: string,
  message: string
): ValidatorFn => {
  return (value): ValidationError => {
    if (value) {
      const regex = new RegExp(patern);
      if (!regex.test(value)) {
        return { message };
      }
    }
    return null;
  };
};

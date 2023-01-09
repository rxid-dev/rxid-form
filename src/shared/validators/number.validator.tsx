import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const numberValidator = (
  message: string = "Angka tidak valid"
): ValidatorFn => {
  return (value): ValidationError => {
    if (value) {
      if (isNaN(+value)) {
        return { message };
      }
    }
    return null;
  };
};

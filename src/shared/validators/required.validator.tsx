import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const requiredValidator = (
  message: string = "Data wajib diisi"
): ValidatorFn => {
  return (value): ValidationError => {
    if (
      typeof value === undefined ||
      value === null ||
      value === "" ||
      value === false
    ) {
      return { message };
    }
    return null;
  };
};

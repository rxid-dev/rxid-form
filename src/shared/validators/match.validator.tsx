import { ValidationError } from "../../core/form/type/ValidationError";
import { ValidatorFn } from "../../core/form/type/ValidationFN";
export const matchValidator = (
  matchWith: string,
  message: string
): ValidatorFn => {
  return (value, parent): ValidationError => {
    if (value) {
      const matchControl = parent?.get(matchWith);
      if (matchControl) {
        if (value !== matchControl.value) {
          return { message };
        }
      } else {
        if (value !== matchWith) {
          return { message };
        }
      }
    }
    return null;
  };
};

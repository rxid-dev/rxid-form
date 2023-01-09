import { minLengthValidator } from "./minLength.validator";
import { requiredValidator } from "./required.validator";
export const Validators = {
  required: requiredValidator,
  minLength: minLengthValidator,
};

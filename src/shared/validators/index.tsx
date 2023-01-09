import { actualLengthValidator } from "./actualLength.validator";
import { emailValidator } from "./email.validator";
import { maxValidator } from "./max.validator";
import { maxLengthValidator } from "./maxLength.validator";
import { minValidator } from "./min.validator";
import { minLengthValidator } from "./minLength.validator";
import { numberValidator } from "./number.validator";
import { regexValidator } from "./regex.validator";
import { requiredValidator } from "./required.validator";
export const Validators = {
  required: requiredValidator,
  min: minValidator,
  max: maxValidator,
  minLength: minLengthValidator,
  actualLength: actualLengthValidator,
  maxLength: maxLengthValidator,
  number: numberValidator,
  regex: regexValidator,
  email: emailValidator,
};

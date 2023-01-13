import { FormControl } from "../FormControl";
import { ValidationError } from "../type/ValidationError";
import { FormParentProps } from "./FormParentProps";

export interface AbstractControlProps {
  value: any;
  patchValue: (value: any) => void;
  isValid: boolean;
  errors: ValidationError;
  controls: { [key: string]: FormControl };
  parent: FormParentProps;
  setParent: (parent: FormParentProps) => void;
}

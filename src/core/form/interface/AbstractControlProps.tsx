import { ControlPropsType } from "../type/ControlProps";
import { ValidationError } from "../type/ValidationError";
import { FormParentProps } from "./FormParentProps";

export interface AbstractControlProps {
  value: any;
  patchValue: (value: any) => void;
  isValid: boolean;
  errors: ValidationError;
  controls: ControlPropsType;
  parent?: FormParentProps;
  setParent: (parent: FormParentProps) => void;
  reset: () => void;
}

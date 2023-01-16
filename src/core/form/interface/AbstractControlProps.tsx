import { ControlPropsType } from "../type/ControlProps";
import { ValidationError } from "../type/ValidationError";
import { ValidatorFn } from "../type/ValidationFN";
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
  setValidators: (validators: ValidatorFn | Array<ValidatorFn>) => void;
  clearValidators: () => void;
  disabled: boolean;
  disable: () => void;
  enable: () => void;
  readonly: boolean;
  setReadOnly: (readOnly?: boolean) => void;
}

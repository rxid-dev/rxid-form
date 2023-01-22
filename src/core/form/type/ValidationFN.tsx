import { FormGroup } from "../FormGroup";
import { ValidationError } from "./ValidationError";

export type ValidatorFn = (value: any, parent?: FormGroup) => ValidationError;

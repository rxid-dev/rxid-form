import { ValidationError } from "./ValidatioError";

export type ValidatorFN = (value: any) => ValidationError;

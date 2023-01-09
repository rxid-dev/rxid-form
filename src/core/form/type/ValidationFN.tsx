import { ValidationError } from "./ValidationError";

export type ValidatorFn = (value: any) => ValidationError;

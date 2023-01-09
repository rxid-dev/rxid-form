import { ValidationError } from "./ValidationError";

export type ValidatorFN = (value: any) => ValidationError;

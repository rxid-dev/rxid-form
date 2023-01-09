import { ValidationError } from "./type/ValidatioError";
import { ValidatorFN } from "./type/ValidationFN";
export class FormControl {
  public errors: ValidationError;
  public value: any;
  constructor(
    private props: [any] | [any, ValidatorFN | Array<ValidatorFN> | null]
  ) {
    this.value = props[0];
    this.errors = this.createErrors(props[0]);
  }

  public patchValue(value: any): void {
    this.value = value;
    this.errors = this.createErrors(value);
  }

  public getIsValid(): boolean {
    return !this.errors;
  }

  private createErrors(value: any): ValidationError {
    if (!this.props[1]) return null;
    const validators = Array.isArray(this.props[1])
      ? this.props[1]
      : [this.props[1]];
    return (
      validators
        .map((validator) => validator(value))
        .filter((error) => error)[0] || null
    );
  }
}

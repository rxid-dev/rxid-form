import { ValidationError } from "./type/ValidationError";
import { ValidatorFN } from "./type/ValidationFN";
export class FormControl {
  public errors: ValidationError;
  public value: any;
  private touched: boolean;
  private dirty: boolean;
  constructor(
    private props: [any] | [any, ValidatorFN | Array<ValidatorFN> | null]
  ) {
    this.value = props[0];
    this.errors = this.createErrors(props[0]);
    this.touched = false;
    this.dirty = false;
  }

  public patchValue(value: any): void {
    this.value = value;
    this.errors = this.createErrors(value);
    this.markAsTouched();
  }

  public getIsValid(): boolean {
    return !this.errors;
  }

  public markAsTouched(): void {
    this.touched = true;
  }

  public markAsDirty(): void {
    this.dirty = true;
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

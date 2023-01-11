import { FormControlOptions } from "./interface/FormControlOptions";
import { ValidationError } from "./type/ValidationError";
import { ValidatorFn } from "./type/ValidationFN";

export type FormControlProps =
  | [any]
  | [any, ValidatorFn | Array<ValidatorFn> | null]
  | [any, ValidatorFn | Array<ValidatorFn> | null, FormControlOptions | null];

export class FormControl {
  public errors: ValidationError;
  public value: any;
  public touched: boolean;
  public dirty: boolean;
  public isValid: boolean;
  constructor(
    public props: FormControlProps,
    public name: string,
    public parent: {
      get: (formControlName: string) => FormControl;
      reloadState: () => void;
    }
  ) {
    this.value = props[0];
    this.errors = this.createErrors(props[0]);
    this.touched = false;
    this.dirty = false;
  }

  // set value from module
  public patchValue(value: any): void {
    if (this.props[2]?.toModel) {
      this.value = this.props[2]?.toModel(value);
      this.errors = this.createErrors(this.value);
    } else {
      this.value = value;
      this.errors = this.createErrors(value);
    }

    this.isValid = !this.errors;
    this.parent.reloadState();
  }

  // set value from component or input
  public setValue(value: any): void {
    this.value = value;
    this.errors = this.createErrors(value);
    this.isValid = !this.errors;
    this.parent.reloadState();
  }

  public markAsTouched(): void {
    this.touched = true;
  }

  public markAsDirty(): void {
    this.dirty = true;
  }

  public get nativeProps(): {
    value: any;
    onChange: (e: any) => void;
    onBlur: () => void;
    name: string;
  } {
    return {
      value: this.value,
      onChange: (event: any) => {
        this.markAsDirty();
        this.setValue(event.target.value);
      },
      onBlur: () => {
        this.markAsTouched();
        this.parent.reloadState();
      },
      name: this.name,
    };
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

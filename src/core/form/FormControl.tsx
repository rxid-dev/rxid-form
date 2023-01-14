import { AbstractControlProps } from "./interface/AbstractControlProps";
import { FormControlNativeProps } from "./interface/FormControlNativeProps";
import { FormControlOptionsProps } from "./interface/FormControlOptions";
import { FormParentProps } from "./interface/FormParentProps";
import { ValidationError } from "./type/ValidationError";
import { ValidatorFn } from "./type/ValidationFN";

export type FormControlValueProps =
  | [any]
  | [any, ValidatorFn | Array<ValidatorFn> | null]
  | [
      any,
      ValidatorFn | Array<ValidatorFn> | null,
      FormControlOptionsProps | null
    ];

interface FormControlProps extends AbstractControlProps {
  touched: boolean;
  dirty: boolean;
  markAsDirty: () => void;
  markAsTouched: () => void;
  validate: () => void;
  nativeProps: FormControlNativeProps;
  setValue: (value: any) => void;
}

export class FormControl implements FormControlProps {
  public controls: { [key: string]: FormControl };
  public errors: ValidationError;
  public value: any;
  public touched: boolean;
  public dirty: boolean;
  public isValid: boolean;
  constructor(
    public props: FormControlValueProps,
    public name: string,
    public parent?: FormParentProps
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
    this.reloadState();
  }

  // set value from component or input
  public setValue(value: any): void {
    this.value = value;
    this.errors = this.createErrors(value);
    this.isValid = !this.errors;
    this.reloadState();
  }

  public markAsTouched(): void {
    this.touched = true;
  }

  public markAsDirty(): void {
    this.dirty = true;
  }

  public get nativeProps(): FormControlNativeProps {
    return {
      value: this.value,
      onChange: (event: any) => {
        this.markAsDirty();
        this.setValue(event.target.value);
      },
      onBlur: () => {
        this.markAsTouched();
        this.reloadState();
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

  public setParent(parent?: FormParentProps): void {
    this.parent = parent;
  }

  public validate(): void {
    this.markAsTouched();
    this.reloadState();
  }

  private reloadState(): void {
    if (!this.parent) return;
    this.parent.reloadState();
  }
}

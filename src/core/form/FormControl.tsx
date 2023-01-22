import React, { createRef } from "react";
import { AbstractControlProps } from "./interface/AbstractControlProps";
import { FormControlNativeProps } from "./interface/FormControlNativeProps";
import { FormControlOptionsProps } from "./interface/FormControlOptions";
import { FormControlProps } from "./interface/FormControlProps";
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

interface Props extends AbstractControlProps {
  touched: boolean;
  dirty: boolean;
  markAsDirty: () => void;
  markAsTouched: () => void;
  nativeProps: FormControlNativeProps;
  setValue: (value: any) => void;
  readonly: boolean;
}

export class FormControl implements Props {
  public controls: { [key: string]: FormControl };
  private _errors: ValidationError;
  private _value: any;
  public touched: boolean;
  public dirty: boolean;
  public isValid: boolean;
  public disabled: boolean;
  public readonly: boolean;
  public ref: React.RefObject<FormControl | undefined>;
  public options?: FormControlOptionsProps | null;
  constructor(
    private _props: FormControlValueProps,
    public name: string,
    public parent?: FormParentProps
  ) {
    this.value = _props[0];
    this.errors = this.createErrors(_props[0]);
    this.isValid = !this.errors;
    this.touched = false;
    this.dirty = false;
    this.disabled = !!_props[2]?.disabled;
    this.readonly = !!_props[2]?.readonly;
    this.ref = createRef<FormControl>();
    this.options = _props[2];
  }

  public get value(): any {
    return this.ref.current ? this.ref.current.value : this._value;
  }

  public set value(value: any) {
    this._value = value;
  }

  public get errors(): ValidationError {
    return this.ref?.current ? this.ref.current.errors : this._errors;
  }

  public set errors(errors: ValidationError) {
    this._errors = errors;
  }

  // set value from module
  public patchValue(value: any): void {
    this._props[0] = value;
    if (this.ref.current) {
      this.ref.current.patchValue(value);
    } else {
      if (this._props[2]?.toModel && value) {
        this.value = this._props[2]?.toModel(value);
        this.errors = this.createErrors(this.value);
      } else {
        this.value = value;
        this.errors = this.createErrors(value);
      }

      this.isValid = !this.errors;
      this.reloadState();
    }
  }

  // set value from component or input
  public setValue(value: any): void {
    this.value = value;
    this.errors = this.createErrors(value);
    this.isValid = !this.errors;
    this.reloadState();
  }

  public markAsTouched(): void {
    if (this.ref.current) {
      this.ref.current.markAsTouched();
    } else {
      this.touched = true;
    }
  }

  public markAsDirty(): void {
    if (this.ref.current) {
      this.ref.current.markAsDirty();
    } else {
      this.dirty = true;
    }
  }

  public get props(): FormControlProps {
    return {
      name: this.name,
      props: this._props,
      ref: this.ref,
      parent: this.parent?.parent,
    };
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
      disabled: this.disabled,
    };
  }

  private createErrors(value: any): ValidationError {
    if (!this._props[1]) return null;
    const validators = Array.isArray(this._props[1])
      ? this._props[1]
      : [this._props[1]];
    return (
      validators
        .map((validator) => validator(value, this.parent?.parent))
        .filter((error) => error)[0] || null
    );
  }

  public setParent(parent?: FormParentProps): void {
    this.parent = parent;
  }

  public validate(): void {
    if (this.ref.current) {
      this.ref.current.validate();
    } else {
      this.markAsTouched();
      this.errors = this.createErrors(this.value);
      this.isValid = !this.errors;
      this.reloadState();
    }
  }

  public reset(): void {
    if (this.ref.current) {
      this.ref.current.reset();
    } else {
      this.touched = false;
      this.dirty = false;
      this.patchValue("");
    }
  }

  public setValidators(validators: ValidatorFn | ValidatorFn[]): void {
    if (this.ref.current) {
      this.ref.current.setValidators(validators);
    } else {
      this._props[1] = validators;
      this.errors = this.createErrors(this.value);
      this.isValid = !this.errors;
      this.reloadState();
    }
  }

  public clearValidators(): void {
    if (this.ref.current) {
      this.ref.current.clearValidators();
    } else {
      this._props[1] = [];
      this.errors = null;
      this.isValid = true;
      this.reloadState();
    }
  }

  public disable(): void {
    if (this.ref.current) {
      this.ref.current.disable();
    } else {
      this.disabled = true;
      this.reloadState();
    }
  }

  public enable(): void {
    if (this.ref.current) {
      this.ref.current.enable();
    } else {
      this.disabled = false;
      this.reloadState();
    }
  }

  public setReadOnly(readOnly = true): void {
    if (this.ref.current) {
      this.ref.current.setReadOnly(readOnly);
    } else {
      this.readonly = readOnly;
      this.reloadState();
    }
  }

  private reloadState(): void {
    if (!this.parent?.reloadState) return;
    this.parent.reloadState();
  }
}

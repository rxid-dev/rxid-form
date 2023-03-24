import { FormGroup } from "./FormGroup";
import { AbstractControlProps } from "./interface/AbstractControlProps";
import { FormControlNativeProps } from "./interface/FormControlNativeProps";
import { FormParentProps } from "./interface/FormParentProps";
import { ValidationError } from "./type/ValidationError";
import { ValidatorFn } from "./type/ValidationFN";

interface FormArrayProps extends AbstractControlProps {
  touched: boolean;
  dirty: boolean;
  nativeProps: FormControlNativeProps;
  setValue: (value: any) => void;
  markAllAsTouched: () => void;
  push: (props: FormGroup) => void;
  removeAt: (index: number) => void;
}

export class FormArray implements FormArrayProps {
  public parent?: FormParentProps;
  public nativeProps: FormControlNativeProps;
  public touched: boolean;
  public dirty: boolean;
  public disabled: boolean;
  public readonly: boolean;
  public setValue: (value: any) => void;
  constructor(public controls: FormGroup[]) {}
  public get value(): any {
    return this.controls.map((control) => control.value);
  }

  public patchValue(values: Array<any>): void {
    values.forEach((value: any, index: number) => {
      this.controls[index].patchValue(value);
    });
  }

  public get isValid(): boolean {
    return (
      this.controls
        .map((formGroup) => formGroup.isValid)
        .filter((isValid) => !isValid).length === 0
    );
  }

  public get errors(): ValidationError {
    return this.controls
      .map((formGroup) => formGroup.errors)
      .filter((error) => error)[0];
  }

  public setParent(parent?: FormParentProps): void {
    this.parent = parent;
  }

  public markAllAsTouched(): void {
    this.controls.forEach((group: FormGroup) => {
      group.markAllAsTouched();
    });
  }

  public push(props: FormGroup): void {
    props.setParent(this.parent);
    if (this.disabled || this.parent?.parent?.disabled) {
      props.disable();
    }

    if (this.readonly || this.parent?.parent?.readonly) {
      props.setReadOnly();
    }

    this.controls.push(props);

    this.reloadState();
  }

  public removeAt(index: number): void {
    this.controls.splice(index, 1);
    this.reloadState();
  }

  public reset(): void {
    this.controls.forEach((formGroup: FormGroup) => {
      formGroup.reset();
    });
  }

  public setValidators(validators: ValidatorFn | Array<ValidatorFn>): void {
    this.controls.forEach((formGroup: FormGroup) => {
      formGroup.setValidators(validators);
    });
  }

  public clearValidators(): void {
    this.controls.forEach((formGroup: FormGroup) => {
      formGroup.clearValidators();
    });
  }

  public disable(): void {
    this.disabled = true;
    this.controls.forEach((formGroup: FormGroup) => {
      formGroup.disable();
    });
  }

  public enable(): void {
    this.disabled = false;
    this.controls.forEach((formGroup: FormGroup) => {
      formGroup.enable();
    });
  }

  public setReadOnly(readOnly = true): void {
    this.readonly = readOnly;
    this.controls.forEach((formGroup: FormGroup) => {
      formGroup.setReadOnly(readOnly);
    });
  }

  public validate(): void {
    this.controls.forEach((formGroup: FormGroup) => {
      formGroup.validate();
    });
  }

  private reloadState(): void {
    if (!this.parent?.reloadState) return;
    this.parent.reloadState();
  }
}

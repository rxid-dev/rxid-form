import { FormControl, FormControlValueProps } from "./FormControl";
import { AbstractControlProps } from "./interface/AbstractControlProps";
import { FormParentProps } from "./interface/FormParentProps";
import { ValidationError } from "./type/ValidationError";

export interface FormGroupProps extends AbstractControlProps {
  addControl: (controlName: string, props: FormControlValueProps) => void;
  removeControl: (controlName: string) => void;
  validate: () => void;
  getFormData: () => FormData;
  setControls: (controls: { [key: string]: FormControl }) => void;
  get: (controlName: string) => FormControl;
}

export class FormGroup implements FormGroupProps {
  public parent: FormParentProps;
  constructor(public controls: { [key: string]: FormControl }) {}
  public patchValue(value: { [key: string]: any }) {
    Object.keys(value).forEach((key) => {
      const control: FormControl = this.get(key);
      if (control) {
        control.patchValue(value[key]);
      }
    });
    this.parent.reloadState();
  }

  public get errors(): ValidationError {
    return Object.keys(this.controls)
      .map((key) => this.get(key).errors)
      .filter((error) => error)[0];
  }

  public get isValid(): boolean {
    return !this.errors;
  }

  public get value(): any {
    const value: { [key: string]: any } = {};
    Object.keys(this.controls).forEach((key: string) => {
      const control: FormControl = this.get(key);
      if (control.props[2]?.toDTO && control.value) {
        let dto = control.props[2]?.toDTO(control.value);
        Object.keys(dto).forEach((dtoKey) => {
          value[dtoKey] = dto[dtoKey];
        });
      } else {
        value[key] = control.value;
      }
    });
    return value;
  }

  public get(controlName: string): FormControl {
    return this.controls[controlName];
  }

  public setControls(controls: { [key: string]: FormControl }): void {
    this.controls = controls;
  }

  public setParent(parent: FormParentProps): void {
    this.parent = parent;
  }

  public addControl(controlName: string, props: FormControlValueProps) {
    const controls = this.controls;
    if (controls[controlName]) return;
    controls[controlName] = new FormControl(props, controlName, this.parent);
    this.parent.reloadState();
  }

  public removeControl(controlName: string): void {
    const controls = this.controls;
    if (!controls[controlName]) return;
    delete controls[controlName];
    this.parent.reloadState();
  }

  public validate(): void {
    Object.keys(this.controls).forEach((key: string) => {
      this.get(key).markAsTouched();
    });
    this.parent.reloadState();
  }

  public getFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.controls).forEach((key: string) => {
      const control: FormControl = this.get(key);
      if (control.props[2]?.toDTO && control.value) {
        let dto = control.props[2]?.toDTO(control.value);
        Object.keys(dto).forEach((dtoKey) => {
          formData.append(dtoKey, dto[dtoKey]);
        });
      } else {
        formData.append(key, control.value);
      }
    });
    return formData;
  }
}

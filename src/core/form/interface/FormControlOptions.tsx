export interface FormControlOptionsProps {
  // get value from control and convert to dto
  toDTO?: (value: any) => { [key: string]: any };
  // get value when user use patchValue and convert to input or component value
  toModel?: (model: any) => any;
}

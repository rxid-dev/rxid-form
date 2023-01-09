import { useState } from "react";
import { FormControl } from "./FormControl";

interface Props {
  [key: string]: any;
}

export const useForm = (props: Props) => {
  const createControls = (props: Props) => {
    const controls: Props = {};
    Object.keys(props).map((key: string) => {
      controls[key] = new FormControl(props[key]);
    });
    return controls;
  };

  const [state, setState] = useState<any>({
    controls: createControls(props),
  });

  const get = (controlName: string): FormControl => {
    return state.controls[controlName];
  };

  const patchValue = (value: { [key: string]: any }) => {
    Object.keys(value).forEach((key) => {
      const control: FormControl = get(key);
      if (control) {
        control.patchValue(value[key]);
      }
    });
    setState((state: any) => ({
      ...state,
    }));
  };

  const getValue = (): { [key: string]: any } => {
    const value: { [key: string]: any } = {};
    Object.keys(state.controls).forEach((key: string) => {
      value[key] = get(key).value;
    });
    return value;
  };

  const getFormData = (): FormData => {
    const formData = new FormData();
    Object.keys(state.controls).forEach((key: string) => {
      formData.append(key, get(key).value);
    });
    return formData;
  };

  const validate = () => {
    Object.keys(state.controls).forEach((key: string) => {
      get(key).markAsTouched();
    });
    setState((state: any) => ({
      ...state,
    }));
  };

  const getIsValid = (): boolean => {
    return (
      Object.keys(state.controls)
        .map((key) => get(key).errors)
        .filter((error) => error).length === 0
    );
  };

  return {
    ...state,
    get,
    getValue,
    getFormData,
    patchValue,
    validate,
    getIsValid,
  };
};

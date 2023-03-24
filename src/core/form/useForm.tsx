import { useState } from "react";
import { FormArray } from "./FormArray";
import { formBuilder } from "./formBuilder";
import { FormControlValueProps } from "./FormControl";
import { FormGroupProps } from "./FormGroup";
import { FormOptionsProps } from "./interface/FormOptionsProps";

interface FormControlProps {
  [key: string]: FormControlValueProps | FormArray;
}

export const useForm = (
  props: FormControlProps,
  options?: FormOptionsProps
): FormGroupProps => {
  const reloadState = (): void => {
    setState((state: any) => ({
      ...state,
      group: state.group,
    }));
  };

  const [state, setState] = useState<{ group: FormGroupProps }>({
    group: formBuilder.group(props, { reloadState }, options),
  });

  return state.group;
};

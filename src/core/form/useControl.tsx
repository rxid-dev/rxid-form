import { useState } from "react";
import { FormControl, FormControlValueProps } from "./FormControl";
import { FormGroup } from "./FormGroup";

export const useControl = (
  controlName: string,
  props: FormControlValueProps,
  parent?: FormGroup
): FormControl => {
  const reloadState = () => {
    setState((state) => ({
      ...state,
      control: state.control,
    }));
  };

  const [state, setState] = useState({
    control: new FormControl(props, controlName, { reloadState, parent }),
  });

  return state.control;
};

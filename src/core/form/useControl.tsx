import { useState } from "react";
import { FormControl, FormControlValueProps } from "./FormControl";

export const useControl = (
  controlName: string,
  props: FormControlValueProps
): FormControl => {
  const reloadState = () => {
    setState((state) => ({
      ...state,
      control: state.control,
    }));
  };

  const [state, setState] = useState({
    control: new FormControl(props, controlName, { reloadState }),
  });

  return state.control;
};

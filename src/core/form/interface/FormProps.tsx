import React from "react";
import { FormControl, FormControlValueProps } from "../FormControl";

export interface FormProps {
  value?: any;
  control?: FormControl;
  placeholder?: string;
  onChange?: (value: any) => void;
  ref?: React.RefObject<FormControl | undefined>;
  name?: string;
  props?: FormControlValueProps;
}

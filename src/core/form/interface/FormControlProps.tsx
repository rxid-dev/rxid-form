import React from "react";
import { FormControl, FormControlValueProps } from "../FormControl";

export interface FormControlProps {
  ref: React.RefObject<FormControl | undefined>;
  props: FormControlValueProps;
  name: string;
}

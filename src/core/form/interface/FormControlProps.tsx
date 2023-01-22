import React from "react";
import { FormControl, FormControlValueProps } from "../FormControl";
import { FormGroup } from "../FormGroup";

export interface FormControlProps {
  ref: React.RefObject<FormControl | undefined>;
  props: FormControlValueProps;
  name: string;
  parent?: FormGroup;
}

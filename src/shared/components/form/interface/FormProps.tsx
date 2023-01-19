import React from "react";
import { FormControl } from "../../../../core/form";

export interface FormProps {
  value?: any;
  control: FormControl;
  placeholder?: string;
  onChange?: (value: any) => void;
  ref?: React.RefObject<any>;
}

import { FunctionComponent } from "react";
import { FormProps } from "../interface/FormProps";
import { InputText } from "./Text";

export const InputNumeric: FunctionComponent<FormProps> = (props) => {
  const onChange = (value: any): void => {
    props.control.setValue(value.replace(/\D/g, ""));
  };

  return <InputText {...props} onChange={onChange} />;
};

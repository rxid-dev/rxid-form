import { FunctionComponent } from "react";
import { FormProps } from "../interface/FormProps";
import { InputText } from "./Text";

export const AlphaNumeric: FunctionComponent<FormProps> = (props) => {
  const onChange = (value: any): void => {
    props.control.setValue(value.replace(/\W/g, ""));
  };

  return <InputText {...props} onChange={onChange} />;
};

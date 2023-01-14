import { FunctionComponent } from "react";
import { FormProps } from "../interface/FormProps";
import { InputText } from "./Text";

export const InputEmail: FunctionComponent<FormProps> = (props) => {
  const onChange = (value: string): void => {
    props.control.setValue(value.toLowerCase());
  };

  return (
    <InputText
      {...props}
      type="email"
      onChange={onChange}
      componentLeft={() => <em className="fas fa-envelope" />}
    />
  );
};

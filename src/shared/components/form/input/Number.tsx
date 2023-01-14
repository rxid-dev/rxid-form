import { FunctionComponent } from "react";
import { FormProps } from "../interface/FormProps";
import { InputText } from "./Text";

interface Props extends FormProps {}

export const InputNumber: FunctionComponent<Props> = (props) => {
  const onChange = (value: any): void => {
    props.control.setValue(value.replace(/\D/g, ""));
  };

  return <InputText {...props} type="number" onChange={onChange} />;
};

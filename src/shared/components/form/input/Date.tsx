import { FunctionComponent } from "react";
import { FormProps } from "../interface/FormProps";
import { InputText } from "./Text";

interface Props extends FormProps {}

export const InputDate: FunctionComponent<Props> = (props) => {
  return <InputText {...props} type="date" />;
};

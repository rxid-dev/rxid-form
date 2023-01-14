import { FunctionComponent } from "react";
import { FormProps } from "../interface/FormProps";
import { InputText } from "./Text";

export const InputTel: FunctionComponent<FormProps> = (props) => {
  return <InputText {...props} componentLeft={() => <>+62</>} />;
};

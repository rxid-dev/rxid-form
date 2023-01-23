import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../../core/form";
import { FormControlComponentProps } from "../../../../core/form/interface/FormControlComponentProps";
import { useControl } from "../../../../core/form/useControl";
import { InputText } from "./Text";

interface Props extends FormControlComponentProps {}

const CustomInputComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = (props, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);
  return <InputText {...props} {...control.props} />;
};

export const CustomInput = React.forwardRef(CustomInputComponent);

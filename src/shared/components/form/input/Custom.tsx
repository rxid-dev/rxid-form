import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../../core/form";
import { FormControlProps } from "../../../../core/form/interface/FormControlProps";
import { useControl } from "../../../../core/form/useControl";
import { InputText } from "./Text";

interface Props extends FormControlProps {
  placeholder?: string;
}

const CustomInputComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = (props, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);
  return <InputText {...props} control={control} />;
};

export const CustomInput = React.forwardRef(CustomInputComponent);

import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../../core/form";
import { FormControlComponentProps } from "../../../../core/form/interface/FormControlComponentProps";
import { useControl } from "../../../../core/form/useControl";
import { InputText } from "./Text";

interface Props extends FormControlComponentProps {}
const InputDateComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  return <InputText placeholder={placeholder} {...control.props} type="date" />;
};

export const InputDate = React.forwardRef(InputDateComponent);

import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../../core/form";
import { FormControlComponentProps } from "../../../../core/form/interface/FormControlComponentProps";
import { useControl } from "../../../../core/form/useControl";
import { InputText } from "./Text";

interface Props extends FormControlComponentProps {}

const InputNumberComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const onChange = (value: any): void => {
    control.setValue(value.replace(/\D/g, ""));
  };

  return (
    <InputText
      placeholder={placeholder}
      control={control}
      type="number"
      onChange={onChange}
    />
  );
};

export const InputNumber = React.forwardRef(InputNumberComponent);

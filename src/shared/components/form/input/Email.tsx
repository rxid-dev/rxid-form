import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../../core/form";
import { FormControlComponentProps } from "../../../../core/form/interface/FormControlComponentProps";
import { useControl } from "../../../../core/form/useControl";
import { InputText } from "./Text";
interface Props extends FormControlComponentProps {}

const InputEmailComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = ({ placeholder, ...props }, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const onChange = (value: string): void => {
    control.setValue(value.toLowerCase());
  };

  return (
    <InputText
      placeholder={placeholder}
      control={control}
      type="email"
      onChange={onChange}
      componentLeft={() => <em className="fas fa-envelope" />}
    />
  );
};

export const InputEmail = React.forwardRef(InputEmailComponent);

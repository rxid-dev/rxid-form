import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../../core/form";
import { FormControlProps } from "../../../../core/form/interface/FormControlProps";
import { useControl } from "../../../../core/form/useControl";
import { InputText } from "./Text";
interface Props extends FormControlProps {
  placeholder?: string;
}

const InputEmailComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = (props, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const onChange = (value: string): void => {
    control.setValue(value.toLowerCase());
  };

  return (
    <InputText
      {...props}
      {...control.props}
      type="email"
      onChange={onChange}
      componentLeft={() => <em className="fas fa-envelope" />}
    />
  );
};

export const InputEmail = React.forwardRef(InputEmailComponent);

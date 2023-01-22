import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../../core/form";
import { FormControlProps } from "../../../../core/form/interface/FormControlProps";
import { useControl } from "../../../../core/form/useControl";
import { InputText } from "./Text";
interface Props extends FormControlProps {
  placeholder?: string;
}

const InputCurrencyComponent: ForwardRefRenderFunction<
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
      value={control.value ? (+control.value).toLocaleString() : ""}
      control={control}
      onChange={onChange}
      componentLeft={() => <>Rp</>}
    />
  );
};

export const InputCurrency = React.forwardRef(InputCurrencyComponent);

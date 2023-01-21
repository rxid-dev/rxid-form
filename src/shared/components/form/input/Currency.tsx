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
> = (props, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const onChange = (value: any): void => {
    control.setValue(value.replace(/\D/g, ""));
  };

  return (
    <InputText
      placeholder={props.placeholder}
      onChange={onChange}
      value={control.value ? (+control.value).toLocaleString() : ""}
      {...control.props}
      componentLeft={() => <>Rp</>}
    />
  );
};

export const InputCurrency = React.forwardRef(InputCurrencyComponent);

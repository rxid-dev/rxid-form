import React, {
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";
import { FormControl } from "../../../../core/form";
import { FormControlProps } from "../../../../core/form/interface/FormControlProps";
import { useControl } from "../../../../core/form/useControl";
import { InputText } from "./Text";
interface Props extends FormControlProps {
  placeholder?: string;
}

const InputPasswordComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = ({ placeholder, ...props }, ref) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const control = useControl(props.name, props.props, props.parent);
  useImperativeHandle(ref, () => control);

  const onChange = (value: string): void => {
    control.setValue(value.toLowerCase());
  };

  return (
    <InputText
      placeholder={placeholder}
      control={control}
      type={isShowPassword ? "text" : "password"}
      onChange={onChange}
      componentRight={() => (
        <em
          className={
            "fas cursor-pointer " + (isShowPassword ? "fa-eye-slash" : "fa-eye")
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      )}
    />
  );
};

export const InputPassword = React.forwardRef(InputPasswordComponent);

import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl, FormControlValueProps } from "../../../../core/form";
import { useControl } from "../../../../core/form/useControl";
import { FormProps } from "../interface/FormProps";

interface Props extends FormProps {
  type?: "date" | "number" | "email";
  componentLeft?: () => JSX.Element;
  props?: FormControlValueProps;
  name?: string;
}

const InputTextComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = (props, ref) => {
  let control: FormControl = useControl(
    props.name as string,
    props.props as FormControlValueProps
  );

  useImperativeHandle(ref, () => control);

  const onChange = (event: any) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    } else {
      control.nativeProps.onChange(event);
    }
  };

  return (
    <>
      {control?.readonly ? (
        <p>{props.value || control.value || "-"}</p>
      ) : (
        <>
          <div className="input-group">
            {props.componentLeft && (
              <span className="input-group-text">{props.componentLeft()}</span>
            )}
            <input
              type={props.type || "text"}
              className={
                "form-control " +
                (control?.touched
                  ? control.isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder={props.placeholder}
              {...control?.nativeProps}
              onChange={onChange}
              value={props.value || control?.nativeProps.value}
            />
          </div>
          {control?.touched && control.errors ? (
            <small className="text-danger">{control.errors?.message}</small>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export const InputText = React.forwardRef(InputTextComponent);

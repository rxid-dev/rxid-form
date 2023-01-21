import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../core/form";
import { FormControlProps } from "../../../core/form/interface/FormControlProps";
import { useControl } from "../../../core/form/useControl";
interface Props extends FormControlProps {
  placeholder?: string;
}

const TextAreaComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = (props, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);
  return (
    <>
      {control.readonly ? (
        <p>{control.value || "-"}</p>
      ) : (
        <>
          <textarea
            className={
              "form-control " +
              (control.touched
                ? control.isValid
                  ? "is-valid"
                  : "is-invalid"
                : "")
            }
            placeholder={props.placeholder}
            {...control.nativeProps}
          />
          {control.touched && control.errors ? (
            <small className="text-danger">{control.errors?.message}</small>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export const TextArea = React.forwardRef(TextAreaComponent);

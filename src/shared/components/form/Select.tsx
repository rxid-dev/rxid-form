import React, { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { FormControl } from "../../../core/form";
import { FormControlProps } from "../../../core/form/interface/FormControlProps";
import { useControl } from "../../../core/form/useControl";

interface Props extends FormControlProps {
  options?: Array<any>;
  onChange?: (value: any) => void;
  placeholder?: string;
}

const SelectComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = (props, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  return (
    <>
      {control.readonly ? (
        <p>{control.value.name || "-"}</p>
      ) : (
        <>
          <select
            className={
              "form-select " +
              (control.touched
                ? control.isValid
                  ? "is-valid"
                  : "is-invalid"
                : "")
            }
            {...control.nativeProps}
            onChange={(e) => {
              let value: any = e.target.value;
              if (value) {
                const indexOfOption = (props.options || []).findIndex(
                  (option) => option.id === +e.target.value
                );
                value = (props.options || [])[indexOfOption];
              }
              control.setValue(value);
              props.onChange && props.onChange(value);
            }}
            value={control.value?.id}
          >
            <option value="">{props.placeholder}</option>
            {(props.options || []).map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
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

export const Select = React.forwardRef(SelectComponent);

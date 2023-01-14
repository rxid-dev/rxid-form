import { FunctionComponent } from "react";
import { FormProps } from "../interface/FormProps";

interface Props extends FormProps {
  type?: "date" | "number";
  onChange?: (value: any) => void;
}

export const InputText: FunctionComponent<Props> = ({
  control,
  placeholder,
  type,
  onChange,
}) => {
  return (
    <>
      <input
        type={type || "text"}
        className={
          "form-control " +
          (control.touched ? (control.isValid ? "is-valid" : "is-invalid") : "")
        }
        placeholder={placeholder}
        {...control.nativeProps}
        onChange={
          onChange
            ? (e) => onChange(e.target.value)
            : control.nativeProps.onChange
        }
      />
      {control.touched && control.errors ? (
        <small className="text-danger">{control.errors?.message}</small>
      ) : (
        <></>
      )}
    </>
  );
};

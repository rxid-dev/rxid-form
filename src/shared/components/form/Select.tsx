import { FunctionComponent } from "react";
import { FormOptionsProps } from "./interface/FormOptionsProps";

export const Select: FunctionComponent<FormOptionsProps> = ({
  control,
  placeholder,
  options,
  onChange,
}) => {
  return (
    <>
      <select
        className={
          "form-select " +
          (control.touched ? (control.isValid ? "is-valid" : "is-invalid") : "")
        }
        {...control.nativeProps}
        onChange={(e) => {
          let value: any = e.target.value;
          if (value) {
            const indexOfOption = (options || []).findIndex(
              (option) => option.id === +e.target.value
            );
            value = (options || [])[indexOfOption];
          }
          control.setValue(value);
          onChange && onChange(value);
        }}
        value={control.value?.id}
      >
        <option value="">{placeholder}</option>
        {(options || []).map((option) => (
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
  );
};

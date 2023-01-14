import { FunctionComponent, useState } from "react";
import { FormOptionsProps } from "./interface/FormOptionsProps";

export const Radio: FunctionComponent<FormOptionsProps> = ({
  control,
  options,
}) => {
  const [state] = useState({
    randomId: Math.ceil(Math.random() * 100),
  });

  return (
    <>
      {(options || []).map((option) => (
        <div className="form-check" key={option.id}>
          <input
            className={
              "form-check-input " +
              (control.touched
                ? control.isValid
                  ? "is-valid"
                  : "is-invalid"
                : "")
            }
            type="radio"
            id={"radio" + state.randomId + option.id}
            {...control.nativeProps}
            value={option.id}
            checked={option.id === +control.value?.id}
            onChange={() => {
              control.setValue(option);
            }}
          />
          <label
            className="form-check-label"
            htmlFor={"radio" + state.randomId + option.id}
          >
            {option.name}
          </label>
        </div>
      ))}
      {control.touched && control.errors ? (
        <small className="text-danger">{control.errors?.message}</small>
      ) : (
        <></>
      )}
    </>
  );
};

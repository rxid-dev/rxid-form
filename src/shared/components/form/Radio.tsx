import React, {
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";
import { FormControl } from "../../../core/form";
import { FormControlProps } from "../../../core/form/interface/FormControlProps";
import { useControl } from "../../../core/form/useControl";

interface Props extends FormControlProps {
  options?: Array<any>;
  onChange?: (value: any) => void;
}

const RadioComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = (props, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const [state] = useState({
    randomId: Math.ceil(Math.random() * 100),
  });

  return (
    <>
      {control.readonly ? (
        <p>{control.value?.name || "-"}</p>
      ) : (
        <>
          {(props.options || []).map((option) => (
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
                  props.onChange && props.onChange(option);
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
      )}
    </>
  );
};

export const Radio = React.forwardRef(RadioComponent);

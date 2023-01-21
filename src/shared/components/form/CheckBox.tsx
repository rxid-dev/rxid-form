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
  placeholder?: string;
}

const CheckBoxComponent: ForwardRefRenderFunction<
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
        <div>
          {props.placeholder ? (
            control.value || "-"
          ) : (
            <ul className="p-0" style={{ listStylePosition: "inside" }}>
              {(control.value || []).map((val: any, index: number) => (
                <li key={index}>{val.name}</li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          {props.placeholder ? (
            <>
              <div className="form-check">
                <input
                  className={
                    "form-check-input " +
                    (control.touched
                      ? control.isValid
                        ? "is-valid"
                        : "is-invalid"
                      : "")
                  }
                  type="checkbox"
                  id={"checkbox" + state.randomId}
                  {...control.nativeProps}
                  checked={!!control.value}
                  onChange={(e) => {
                    control.setValue(e.target.checked);
                    control.markAsTouched();
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={"checkbox" + state.randomId}
                >
                  {props.placeholder}
                </label>
              </div>
            </>
          ) : (
            (props.options || []).map((option) => (
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
                  type="checkbox"
                  id={"checkbox" + state.randomId + option.id}
                  {...control.nativeProps}
                  value={option.id}
                  checked={
                    (control.value || []).findIndex(
                      (val: any) => val.id === option.id
                    ) !== -1
                  }
                  onChange={(e) => {
                    const value = control.value || [];
                    if (e.target.checked) {
                      value.push(option);
                    } else {
                      const indexOfOption = value.findIndex(
                        (val: any) => val.id === option.id
                      );
                      if (indexOfOption !== -1) {
                        value.splice(indexOfOption, 1);
                      }
                    }
                    control.setValue(value.length > 0 ? value : "");
                    control.markAsTouched();
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={"checkbox" + state.randomId + option.id}
                >
                  {option.name}
                </label>
              </div>
            ))
          )}
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

export const CheckBox = React.forwardRef(CheckBoxComponent);

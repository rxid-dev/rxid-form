import { FunctionComponent } from "react";
import { FormProps } from "./interface/FormProps";

export const TextArea: FunctionComponent<FormProps> = ({
  control,
  placeholder,
}) => {
  console.log("INFO: Come from TextArea");
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
            placeholder={placeholder}
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

import React, {
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Dropdown, Form } from "react-bootstrap";
import { FormControl } from "../../../../core/form";
import { FormControlOptionsComponentProps } from "../../../../core/form/interface/FormControlOptionsComponentProps";
import { useControl } from "../../../../core/form/useControl";
import "./Autocomplete.scss";

interface Props extends FormControlOptionsComponentProps {}

const AutocompleteComponent: ForwardRefRenderFunction<
  FormControl | undefined,
  Props
> = (props, ref) => {
  const control = useControl(props.name, props.props);
  useImperativeHandle(ref, () => control);

  const [state, setState] = useState({
    options: [],
    isShow: false,
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    const response = await fetch("http://localhost:3001/country");
    const result = await response.json();
    setState((state) => ({
      ...state,
      options: result || [],
    }));
  };

  const handleToggle = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <Dropdown onToggle={handleToggle}>
        <Dropdown.Toggle
          as={CustomToggle}
          onClick={() => {
            setState((state) => ({
              ...state,
              isShow: !state.isShow,
            }));
          }}
        >
          {control.value.name || props.placeholder || ""}
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={CustomMenu}
          options={state.options}
          onChoose={(option: any) => {
            control.setValue(option);
            setState((state) => ({
              ...state,
              isShow: false,
            }));
          }}
        ></Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const CustomMenu = React.forwardRef<any, any>(({ options, onChoose }, ref) => {
  const [value, setValue] = useState("");

  return (
    <div className="auto-complete" ref={ref}>
      <Form.Control
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="Type to filter..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ul className="list">
        {options.map((option: any, index: number) => (
          <li
            className="list-item"
            key={index}
            onClick={() => onChoose(option)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

const CustomToggle = React.forwardRef<
  any,
  { children: JSX.Element; onClick: (e: any) => void }
>(({ children, onClick }, ref) => (
  <div
    className="form-control cursor-pointer d-flex justify-content-between align-items-center"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span className="text">{children}</span>
    <em className="fas fa-chevron-down"></em>
  </div>
));

export const Autocomplete = React.forwardRef(AutocompleteComponent);

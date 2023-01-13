import { FormControl, FormControlValueProps } from "./FormControl";
import { FormGroup } from "./FormGroup";
import { FormParentProps } from "./interface/FormParentProps";

interface FormControlProps {
  [key: string]: FormControlValueProps;
}

export const formBuilder = {
  group: (props: FormControlProps, parent: FormParentProps): FormGroup => {
    const formGroup = new FormGroup({});
    formGroup.setParent(parent);
    const controls: { [key: string]: FormControl } = {};
    Object.keys(props).forEach((key: string) => {
      controls[key] = new FormControl(props[key], key, parent);
    });
    formGroup.setControls(controls);
    return formGroup;
  },
};

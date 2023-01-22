import { FormArray } from "./FormArray";
import { FormControl, FormControlValueProps } from "./FormControl";
import { FormGroup } from "./FormGroup";
import { FormParentProps } from "./interface/FormParentProps";

interface FormControlProps {
  [key: string]: FormControlValueProps | FormArray;
}

export const formBuilder = {
  group: (props: FormControlProps, parent?: FormParentProps): FormGroup => {
    const formGroup = new FormGroup({});
    if (!parent) {
      parent = {
        parent: formGroup,
      };
    } else {
      parent.parent = formGroup;
    }

    formGroup.setParent(parent);
    const controls: { [key: string]: FormControl | FormArray } = {};
    Object.keys(props).forEach((key: string) => {
      const prop: FormControlValueProps | FormArray = props[key];
      if (prop instanceof FormArray) {
        prop.setParent(parent);
        controls[key] = prop;
      } else {
        controls[key] = new FormControl(prop, key, parent);
      }
    });
    formGroup.setControls(controls);
    return formGroup;
  },
  array: () => {
    const formArray = new FormArray([]);
    return formArray;
  },
};

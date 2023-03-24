import { FormArray } from "./FormArray";
import { FormControl, FormControlValueProps } from "./FormControl";
import { FormGroup } from "./FormGroup";
import { FormOptionsProps } from "./interface/FormOptionsProps";
import { FormParentProps } from "./interface/FormParentProps";

interface FormControlProps {
  [key: string]: FormControlValueProps | FormArray;
}

export const formBuilder = {
  group: (
    props: FormControlProps,
    parent?: FormParentProps,
    options?: FormOptionsProps
  ): FormGroup => {
    const formGroup = new FormGroup({});

    if (options && options.readonly) {
      formGroup.readonly = options.readonly;
    }

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
        if (formGroup.readonly) {
          if (typeof prop[2] === "undefined") {
            prop[2] = {
              readonly: formGroup.readonly,
            };
          } else if (prop[2] && typeof prop[2].readonly === "undefined") {
            prop[2].readonly = formGroup.readonly;
          }
        }

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

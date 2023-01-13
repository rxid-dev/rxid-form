import { FormArray } from "../FormArray";
import { FormControl } from "../FormControl";
import { FormGroup } from "../FormGroup";

export type ControlPropsType =
  | { [key: string]: FormControl | FormArray }
  | Array<FormGroup>;

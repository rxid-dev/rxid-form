import { FormControl, FormControlValueProps } from "../FormControl";
import { FormGroup } from "../FormGroup";
export interface FormControlComponentProps {
  props: FormControlValueProps;
  name: string;
  parent?: FormGroup;
  ref: React.RefObject<FormControl | undefined>;
  placeholder?: string;
}

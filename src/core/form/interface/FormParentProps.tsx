import { FormGroup } from "../FormGroup";
export interface FormParentProps {
  reloadState?: () => void;
  parent?: FormGroup;
}

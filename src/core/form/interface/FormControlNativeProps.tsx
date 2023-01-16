export interface FormControlNativeProps {
  value: any;
  onChange: (event: any) => void;
  onBlur: () => void;
  name: string;
  disabled: boolean;
}

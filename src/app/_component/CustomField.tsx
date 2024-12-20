/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { FieldInputProps, FormikProps, getIn } from "formik";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  label?: string;
  className?: string;
  name?: string;
}

export const InputField = ({
  field,
  form: { touched, errors },
  ...props
}: InputFieldProps) => {
  const error = getIn(errors, field.name);
  const isTouched = getIn(touched, field.name);

  return (
    <div className={`form-control ${props.className ? props.className : ""}`}>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <Input
        id={props.name}
        placeholder={props.label}
        {...field}
        {...props}
        className={`mt-1 ${
          error && isTouched ? "border-red-500 focus:border-red-500" : ""
        }`}
      />
      {error && isTouched && (
        <small className="text-red-600 text-sm">{error}</small>
      )}
    </div>
  );
};

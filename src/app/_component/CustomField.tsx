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
  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>{props.label}</Label>
      <Input
        id={field.name}
        {...field}
        {...props}
        value={field.value ? field.value : ""}
      />
      {Boolean(getIn(errors, field.name)) && getIn(touched, field.name) && (
        <small className="text-danger">{getIn(errors, field.name)}</small>
      )}
    </div>
  );
};

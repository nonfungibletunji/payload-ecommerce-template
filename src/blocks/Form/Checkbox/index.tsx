/* eslint-disable */
import {
  useFormContext,
  type FieldErrorsImpl,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";

import { Checkbox as CheckboxUi } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Error } from "../Error";
import { Width } from "../Width";

import type { CheckboxField } from "@payloadcms/plugin-form-builder/types";

export const Checkbox = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}: CheckboxField & {
  errors: Partial<FieldErrorsImpl<Record<string, any>>>;
  getValues: any;
  register: UseFormRegister<FieldValues>;
  setValue: any;
}) => {
  const props = register(name, { required: requiredFromProps });
  const { setValue } = useFormContext();

  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          {...props}
          onCheckedChange={(checked) => {
            setValue(props.name, checked);
          }}
        />
        <Label htmlFor={name}>{label}</Label>
      </div>
      {requiredFromProps && errors[name] && <Error />}
    </Width>
  );
};

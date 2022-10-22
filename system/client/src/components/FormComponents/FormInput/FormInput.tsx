/* eslint-disable react/jsx-props-no-spreading */
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import "./FormInput.css";

type FormInputProps = {
  label: string;
  type: "text" | "date" | "file" | "number";
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder?: string;
  formState: FormState<FieldValues>;
  rules: any;
  disabled?: boolean;
};

function FormInput({
  label,
  type,
  register,
  name,
  placeholder, // optional
  formState,
  rules,
  disabled,
}: FormInputProps) {
  return (
    <div className="FormInput">
      <label htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, rules)}
        />
      </div>
      {formState.errors[name] && (
        <p className="formfeedback">
          {String(formState.errors[name]?.message)}
        </p>
      )}
    </div>
  );
}

export default FormInput;

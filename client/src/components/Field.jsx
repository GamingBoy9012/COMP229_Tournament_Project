import React from "react";

// Reusable labelled input used by every form.
export default function Field({ label, name, value, onChange, type = "text", ...rest }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} value={value ?? ""} onChange={onChange} required {...rest} />
    </label>
  );
}

export function useForm(initial) {
  const [values, setValues] = React.useState(initial);
  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  return { values, setValues, onChange };
}
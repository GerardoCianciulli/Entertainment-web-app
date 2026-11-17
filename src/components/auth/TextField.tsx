import { useField } from 'formik';

type TextFieldProps = {
  name: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  autoComplete: string;
};

/** Underlined input from the design system: idle / active (white line) / error (red line + message). */
export function TextField({ name, type, placeholder, autoComplete }: TextFieldProps) {
  const [field, meta] = useField<string>(name);
  const invalid = Boolean(meta.touched && meta.error);
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`field${invalid ? ' field--error' : ''}`}>
      <label className="visually-hidden" htmlFor={inputId}>
        {placeholder}
      </label>
      <input
        {...field}
        id={inputId}
        className="field__input"
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
      />
      {invalid && (
        <p className="field__error" id={errorId}>
          {meta.error}
        </p>
      )}
    </div>
  );
}

import * as Yup from 'yup';

export const EMPTY_MESSAGE = 'Can’t be empty';

/** name@domain.suffix (sub-domains allowed, suffix of at least two letters: .it, .ca, .com …) */
const EMAIL_PATTERN = /^[^\s@]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;

const email = Yup.string().trim().required(EMPTY_MESSAGE).matches(EMAIL_PATTERN, 'Invalid email');

/** At least 8 characters with one capital letter, one number and one special character. */
const password = Yup.string()
  .required(EMPTY_MESSAGE)
  .min(8, 'At least 8 characters')
  .matches(/[A-Z]/, 'Needs a capital letter')
  .matches(/\d/, 'Needs a number')
  .matches(/[^A-Za-z0-9\s]/, 'Needs a special character');

export const loginSchema = Yup.object({ email, password });

export const signUpSchema = Yup.object({
  email,
  password,
  repeatPassword: Yup.string()
    .required(EMPTY_MESSAGE)
    .oneOf([Yup.ref('password')], 'Passwords don’t match'),
});

export type LoginValues = Yup.InferType<typeof loginSchema>;
export type SignUpValues = Yup.InferType<typeof signUpSchema>;

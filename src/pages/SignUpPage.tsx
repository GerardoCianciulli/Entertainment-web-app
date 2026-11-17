import { useRef } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { AuthLayout } from '../components/auth/AuthLayout';
import { FocusFirstError } from '../components/auth/FocusFirstError';
import { TextField } from '../components/auth/TextField';
import { registerMember } from '../lib/api';
import { pageUrl } from '../lib/paths';
import { signUpSchema, type SignUpValues } from '../lib/validation';
import { JUST_REGISTERED_KEY } from './LoginPage';

export function SignUpPage() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(values: SignUpValues, { setFieldError, setStatus }: FormikHelpers<SignUpValues>) {
    setStatus(undefined);
    try {
      // POSTs the new member to JSON-Server, which writes it into data.json.
      const result = await registerMember(values.email, values.password);
      if (result === 'exists') return setFieldError('email', 'Already registered');
      try {
        sessionStorage.setItem(JUST_REGISTERED_KEY, '1');
      } catch {
        /* the confirmation notice is optional */
      }
      window.location.assign(pageUrl.login);
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    }
  }

  return (
    <AuthLayout title="Sign Up" variant="sign-up">
      <Formik<SignUpValues>
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form ref={formRef} className="auth-form" noValidate>
            <FocusFirstError formRef={formRef} />
            <div className="auth-form__fields">
              <TextField name="email" type="email" placeholder="Email address" autoComplete="email" />
              <TextField name="password" type="password" placeholder="Password" autoComplete="new-password" />
              <TextField
                name="repeatPassword"
                type="password"
                placeholder="Repeat password"
                autoComplete="new-password"
              />
            </div>
            {status && (
              <p className="auth-form__status" role="alert">
                {status}
              </p>
            )}
            <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
              Create an account
            </button>
            <p className="auth-form__switch">
              Already have an account? <a href={pageUrl.login}>Login</a>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

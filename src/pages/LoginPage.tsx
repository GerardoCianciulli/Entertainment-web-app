import { useRef, useState } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { AuthLayout } from '../components/auth/AuthLayout';
import { FocusFirstError } from '../components/auth/FocusFirstError';
import { TextField } from '../components/auth/TextField';
import { verifyMember } from '../lib/api';
import { pageUrl } from '../lib/paths';
import { signIn } from '../lib/session';
import { loginSchema, type LoginValues } from '../lib/validation';

export const JUST_REGISTERED_KEY = 'ewa:just-registered';

function consumeJustRegistered(): boolean {
  try {
    const flag = sessionStorage.getItem(JUST_REGISTERED_KEY) !== null;
    sessionStorage.removeItem(JUST_REGISTERED_KEY);
    return flag;
  } catch {
    return false;
  }
}

export function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [justRegistered] = useState(consumeJustRegistered);

  async function handleSubmit(values: LoginValues, { setFieldError, setStatus }: FormikHelpers<LoginValues>) {
    setStatus(undefined);
    try {
      const result = await verifyMember(values.email, values.password);
      if (result === 'unknown-email') return setFieldError('email', 'No account found');
      if (result === 'wrong-password') return setFieldError('password', 'Wrong password');
      signIn(values.email);
      window.location.assign(pageUrl.home);
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    }
  }

  return (
    <AuthLayout title="Login" variant="login">
      {justRegistered && <p className="auth__notice">Account created. Log in to continue.</p>}
      <Formik<LoginValues> initialValues={{ email: '', password: '' }} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form ref={formRef} className="auth-form" noValidate>
            <FocusFirstError formRef={formRef} />
            <div className="auth-form__fields">
              <TextField name="email" type="email" placeholder="Email address" autoComplete="email" />
              <TextField name="password" type="password" placeholder="Password" autoComplete="current-password" />
            </div>
            {status && (
              <p className="auth-form__status" role="alert">
                {status}
              </p>
            )}
            <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
              Login to your account
            </button>
            <p className="auth-form__switch">
              Don’t have an account? <a href={pageUrl.signUp}>Sign Up</a>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

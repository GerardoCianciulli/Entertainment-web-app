import type { ReactNode } from 'react';
import Logo from '/assets/logo.svg?react';
import { pageUrl } from '../../lib/paths';
import './auth.css';

type AuthLayoutProps = {
  title: string;
  variant: 'login' | 'sign-up';
  children: ReactNode;
};

export function AuthLayout({ title, variant, children }: AuthLayoutProps) {
  return (
    <main className={`auth auth--${variant}`}>
      <h1 className="visually-hidden">Entertainment web app: {title}</h1>
      <a className="auth__logo" href={pageUrl.home} aria-label="Entertainment web app home">
        <Logo aria-hidden="true" />
      </a>
      <section className="auth__card" aria-labelledby="auth-title">
        <h2 className="auth__title" id="auth-title">
          {title}
        </h2>
        {children}
      </section>
    </main>
  );
}

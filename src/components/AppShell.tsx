import type { ReactNode } from 'react';
import type { PageId } from '../types';
import { Nav } from './Nav';
import { SearchBar } from './SearchBar';
import './AppShell.css';

type AppShellProps = {
  page: PageId;
  pageTitle: string;
  searchPlaceholder: string;
  query: string;
  onQueryChange: (query: string) => void;
  status: 'loading' | 'ready' | 'error';
  children: ReactNode;
};

export function AppShell({ page, pageTitle, searchPlaceholder, query, onQueryChange, status, children }: AppShellProps) {
  return (
    <div className="app">
      <Nav current={page} />
      <main className="app__main">
        <h1 className="visually-hidden">Entertainment web app: {pageTitle}</h1>
        <SearchBar placeholder={searchPlaceholder} value={query} onChange={onQueryChange} />
        {status === 'error' ? (
          <p className="app__status" role="alert">
            Sorry, the catalogue couldn’t be loaded. Please try again later.
          </p>
        ) : (
          <div aria-busy={status === 'loading'}>{children}</div>
        )}
      </main>
    </div>
  );
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/global.css';
import { BookmarkedPage } from '../pages/BookmarkedPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookmarkedPage />
  </StrictMode>,
);

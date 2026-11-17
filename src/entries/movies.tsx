import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/global.css';
import { CategoryPage } from '../pages/CategoryPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CategoryPage category="Movie" />
  </StrictMode>,
);

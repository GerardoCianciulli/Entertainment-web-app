/** URLs of the site's pages, resolved against Vite's `base` so they work locally and on GitHub Pages. */
const base = import.meta.env.BASE_URL;

export const pageUrl = {
  home: base,
  movies: `${base}movies.html`,
  tvSeries: `${base}tv-series.html`,
  bookmarked: `${base}bookmarked.html`,
  login: `${base}login.html`,
  signUp: `${base}sign-up.html`,
} as const;

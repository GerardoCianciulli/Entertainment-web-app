import { useMemo, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { MediaSection } from '../components/MediaSection';
import { useVideos } from '../hooks/useVideos';
import { resultsHeading, searchVideos } from '../lib/search';
import type { Category } from '../types';

const config = {
  Movie: { page: 'movies', title: 'Movies', placeholder: 'Search for movies' },
  'TV Series': { page: 'tv-series', title: 'TV Series', placeholder: 'Search for TV series' },
} as const;

/** Movies and TV Series pages: one category, searchable within that category only. */
export function CategoryPage({ category }: { category: Category }) {
  const { page, title, placeholder } = config[category];
  const { videos, status, toggleBookmark } = useVideos();
  const [query, setQuery] = useState('');
  const isSearching = query.trim() !== '';

  const inCategory = useMemo(() => videos.filter((v) => v.category === category), [videos, category]);
  const shown = useMemo(() => searchVideos(inCategory, query), [inCategory, query]);

  return (
    <AppShell
      page={page}
      pageTitle={title}
      searchPlaceholder={placeholder}
      query={query}
      onQueryChange={setQuery}
      status={status}
    >
      <MediaSection
        title={isSearching ? resultsHeading(shown.length, query) : title}
        videos={shown}
        onToggleBookmark={toggleBookmark}
        variant={isSearching ? 'home' : 'page'}
      />
    </AppShell>
  );
}

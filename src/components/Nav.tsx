import type { ComponentType, SVGProps } from 'react';
import Logo from '/assets/logo.svg?react';
import HomeIcon from '/assets/icon-nav-home.svg?react';
import MoviesIcon from '/assets/icon-nav-movies.svg?react';
import TvSeriesIcon from '/assets/icon-nav-tv-series.svg?react';
import BookmarkIcon from '/assets/icon-nav-bookmark.svg?react';
import avatar from '/assets/image-avatar.png';
import { pageUrl } from '../lib/paths';
import type { PageId } from '../types';
import './Nav.css';

type NavItem = {
  id: PageId;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const items: NavItem[] = [
  { id: 'home', label: 'Home', href: pageUrl.home, icon: HomeIcon },
  { id: 'movies', label: 'Movies', href: pageUrl.movies, icon: MoviesIcon },
  { id: 'tv-series', label: 'TV Series', href: pageUrl.tvSeries, icon: TvSeriesIcon },
  { id: 'bookmarked', label: 'Bookmarked', href: pageUrl.bookmarked, icon: BookmarkIcon },
];

export function Nav({ current }: { current: PageId }) {
  return (
    <header className="nav">
      <a className="nav__logo" href={pageUrl.home} aria-label="Entertainment web app home">
        <Logo aria-hidden="true" />
      </a>

      <nav aria-label="Main">
        <ul className="nav__list">
          {items.map(({ id, label, href, icon: Icon }) => (
            <li key={id}>
              <a
                className={`nav__link nav__link--${id}`}
                href={href}
                aria-label={label}
                aria-current={current === id ? 'page' : undefined}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a className="nav__avatar" href={pageUrl.login} aria-label="Account: login or sign up">
        <img src={avatar} alt="" width={40} height={40} />
      </a>
    </header>
  );
}

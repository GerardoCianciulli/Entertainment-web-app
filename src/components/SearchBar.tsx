import { useCallback, useId, useRef } from 'react';
import SearchIcon from '/assets/icon-search.svg?react';
import { useSearchShortcuts } from '../hooks/useSearchShortcuts';
import './SearchBar.css';

type SearchBarProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const clear = useCallback(() => onChange(''), [onChange]);
  useSearchShortcuts(inputRef, clear);

  return (
    <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label className="visually-hidden" htmlFor={id}>
        {placeholder}
      </label>
      <SearchIcon className="search__icon" aria-hidden="true" />
      <input
        ref={inputRef}
        id={id}
        className="search__input"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
    </form>
  );
}

import { useEffect, type RefObject } from 'react';
import $ from 'jquery';

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

/**
 * jQuery interaction: press "/" anywhere to jump to the search field,
 * and "Escape" inside it to clear the search.
 */
export function useSearchShortcuts(inputRef: RefObject<HTMLInputElement | null>, onClear: () => void) {
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const $input = $(input);
    const $document = $(document);

    $document.on('keydown.searchshortcuts', (event) => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target)) return;
      event.preventDefault();
      $input.trigger('focus');
    });

    $input.on('keydown.searchshortcuts', (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      onClear();
      $input.trigger('blur');
    });

    return () => {
      $document.off('.searchshortcuts');
      $input.off('.searchshortcuts');
    };
  }, [inputRef, onClear]);
}

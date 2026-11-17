import { useEffect, useId, type RefObject } from 'react';
import $ from 'jquery';

const DRAG_THRESHOLD = 5;

/**
 * jQuery interaction: click-and-drag to scroll a horizontal list with the mouse
 * (touch devices and trackpads already scroll it natively).
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  const namespace = `.dragscroll${useId().replace(/[^a-z0-9]/gi, '')}`;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const $element = $(element);
    const $window = $(window);
    let pointerDown = false;
    let dragged = false;
    let startX = 0;
    let startScroll = 0;

    $element.on(`mousedown${namespace}`, (event) => {
      if (event.button !== 0) return;
      pointerDown = true;
      dragged = false;
      startX = event.pageX ?? 0;
      startScroll = element.scrollLeft;
    });

    $window.on(`mousemove${namespace}`, (event) => {
      if (!pointerDown) return;
      const distance = (event.pageX ?? 0) - startX;
      if (!dragged && Math.abs(distance) > DRAG_THRESHOLD) {
        dragged = true;
        $element.addClass('is-dragging');
      }
      if (dragged) element.scrollLeft = startScroll - distance;
    });

    $window.on(`mouseup${namespace}`, () => {
      pointerDown = false;
      $element.removeClass('is-dragging');
    });

    // A drag ends with a click: swallow it so letting go over a card doesn't toggle a bookmark.
    $element.on(`click${namespace}`, (event) => {
      if (!dragged) return;
      dragged = false;
      event.preventDefault();
      event.stopPropagation();
    });

    return () => {
      $element.off(namespace).removeClass('is-dragging');
      $window.off(namespace);
    };
  }, [ref, namespace]);
}

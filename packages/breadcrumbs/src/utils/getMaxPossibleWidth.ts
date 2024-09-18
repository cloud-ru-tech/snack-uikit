import { isBrowser } from '@snack-uikit/utils';

/**
 * Функция предназначена для измерения максимально возможной ширины контейнера
 * она вставляет широкую распорку, замеряет ширину и удаляет ее
 * это происходит в одном обороте eventLoop, поэтому новый кадр с распоркой не рендерится браузером.
 */
export const getMaxPossibleWidth = (element: HTMLElement): number => {
  if (!element) {
    return 0;
  }

  if (isBrowser()) {
    const spreader = document.createElement('div');
    spreader.style.width = '10000px';
    element.append(spreader);
    const width = element.getBoundingClientRect().width;
    element.removeChild(spreader);

    return width;
  }

  return 0;
};

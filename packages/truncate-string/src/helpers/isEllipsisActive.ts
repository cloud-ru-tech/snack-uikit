export const isEllipsisActive = (element: HTMLElement | null) => {
  if (!element) {
    return false;
  }

  return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
};

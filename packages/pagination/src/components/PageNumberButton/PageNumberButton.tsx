import { MouseEvent, Ref } from 'react';

import { PageButton } from '../PageButton';

export type PageNumberButtonProps = {
  page: number;
  onClick(page: number, event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void;
  activated?: boolean;
  setButtonRef?: Ref<HTMLButtonElement | HTMLAnchorElement>;
  hrefFormatter?(page: number): string;
};

export function PageNumberButton({ page, onClick, hrefFormatter, activated, setButtonRef }: PageNumberButtonProps) {
  const handleClick = (event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => onClick(page, event);

  const formattedHref = hrefFormatter && hrefFormatter(page);

  return (
    <PageButton
      label={page}
      onClick={handleClick}
      activated={activated}
      aria-current={activated ? 'page' : undefined}
      data-test-id={`page-number-button-${page}`}
      setButtonRef={setButtonRef}
      href={formattedHref}
    />
  );
}

import { Ref } from 'react';

import { PageButton } from '../PageButton';

export type PageNumberButtonProps = {
  page: number;
  onClick(page: number): void;
  activated?: boolean;
  setButtonRef?: Ref<HTMLButtonElement>;
};

export function PageNumberButton({ page, onClick, activated, setButtonRef }: PageNumberButtonProps) {
  const handleClick = () => onClick(page);

  return (
    <PageButton
      label={page}
      onClick={handleClick}
      activated={activated}
      aria-current={activated ? 'page' : undefined}
      data-test-id={`page-number-button-${page}`}
      setButtonRef={setButtonRef}
    />
  );
}

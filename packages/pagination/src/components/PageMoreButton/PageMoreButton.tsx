import { PageButton } from '../PageButton';

export type PageMoreButtonProps = {
  start: number;
  end: number;
  onClick(start: number, end: number): void;
};

export function PageMoreButton({ start, end, onClick }: PageMoreButtonProps) {
  const handleClick = () => onClick(start, end);

  return <PageButton label='...' onClick={handleClick} data-test-id={`page-more-button-${start}-${end}`} />;
}

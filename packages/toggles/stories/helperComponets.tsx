import { useToggleGroup } from '../src';
import styles from './styles.module.scss';

export type ToggleCardProps = {
  id: string;
  label: string;
};

export function ToggleCard({ id, label }: ToggleCardProps) {
  const { isChecked, handleClick } = useToggleGroup(id);

  return (
    <button
      data-test-id={`item-${id}`}
      data-checked={isChecked}
      className={isChecked ? styles.checked : styles.unchecked}
      onClick={handleClick}
      key={label}
    >
      {label}
    </button>
  );
}

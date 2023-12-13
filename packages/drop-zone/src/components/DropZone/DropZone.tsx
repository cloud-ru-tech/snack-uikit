import { DropEventNames, PrivateDropZone, PrivateDropZoneProps } from '../../helperComponents';
import { useDrag } from '../../hooks/useDrag';

export type DropZoneProps = Omit<PrivateDropZoneProps, 'isOver' | DropEventNames>;

/** Компонент - дропзона */
export function DropZone({ ...props }: DropZoneProps) {
  const { disabled = false, ...rest } = props;

  const { events, isOver } = useDrag(disabled);

  return <PrivateDropZone {...events} {...rest} isOver={isOver} disabled={disabled} />;
}

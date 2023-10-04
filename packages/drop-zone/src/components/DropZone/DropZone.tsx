import { DropEventNames, PrivateDropZone, PrivateDropZoneProps, UploadMode } from '../../helperComponents';
import { useDrag } from '../../hooks/useDrag';

export type DropZoneProps = Omit<PrivateDropZoneProps, 'isOver' | DropEventNames>;

/** Компонент - дропзона */
export function DropZone({ ...props }: DropZoneProps): JSX.Element {
  const { disabled = false, ...rest } = props;

  const { events, isOver } = useDrag(disabled);

  return <PrivateDropZone {...events} {...rest} isOver={isOver} disabled={disabled} />;
}

DropZone.uploadModes = UploadMode;

import cn from 'classnames';
import { ReactNode } from 'react';

import { PrivateDropZone, UploadMode } from '../../helperComponents';
import { useDrag } from '../../hooks/useDrag';
import { DropZoneProps } from '../DropZone';
import classNames from './styles.module.scss';

export type HiddenDropZoneProps = DropZoneProps & {
  children: ReactNode;
};

/** Компонент - скрытая дропзона */
export function HiddenDropZone(props: HiddenDropZoneProps) {
  const { disabled = false, children, className, ...rest } = props;

  const { events, isOver } = useDrag(disabled);

  return (
    <div className={cn(classNames.wrapper, className)} {...events}>
      {isOver && !disabled && <PrivateDropZone className={classNames.dropZone} {...events} {...rest} isOver />}
      <div className={cn(classNames.children, isOver && classNames.hidden)}>{children}</div>
    </div>
  );
}

HiddenDropZone.uploadModes = UploadMode;

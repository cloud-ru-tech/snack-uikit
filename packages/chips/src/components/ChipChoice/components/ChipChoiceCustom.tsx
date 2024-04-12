import { ReactNode, useCallback, useRef, useState } from 'react';

import { Dropdown } from '@snack-uikit/dropdown';
import { useValueControl } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE } from '../../../constants';
import { useHandleOnKeyDown } from '../hooks';
import { ChipChoiceCommonProps } from '../types';
import { ChipChoiceBase } from './ChipChoiceBase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

export type CustomContentRenderProps<T = AnyType> = {
  closeDroplist(): void;
  value: T;
  onChange?(value: T): void;
};

export type ChipChoiceCustomProps = ChipChoiceCommonProps & {
  /** Отображаемое значение */
  valueRender?(value: AnyType): ReactNode;
  /** Фактическое значение. Используется для отображения кнопки очистки, если свойство <strong>showClearButton=true</strong> */
  value?: AnyType;
  onChange?(value: AnyType): void;
  /** Контент выпадающего меню
   <br>
   <br> Принимает <strong>ReactNode</strong>
   <br> Или функцию с аргументами:
   <br> <strong>handleDroplistItemKeyDown</strong>: Обработчик нажатия клавиши на элемент выпадающего меню
   <br> <strong>closeDroplist</strong>: Метод для закрытия выпадающего меню
   */
  content?: (props: CustomContentRenderProps) => ReactNode;
};

export function ChipChoiceCustom({
  size = SIZE.S,
  value: valueProp,
  onChange: onChangeProp,
  placement = 'bottom-start',
  widthStrategy = 'gte',
  content,
  valueRender,
  ...rest
}: ChipChoiceCustomProps) {
  const localRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useValueControl<AnyType>({
    value: valueProp,
    onChange: onChangeProp,
  });

  const [open, setOpen] = useState<boolean>(false);
  const handleOnKeyDown = useHandleOnKeyDown({ setOpen });

  const closeDroplist = useCallback(() => {
    setOpen(false);
    setTimeout(() => localRef.current?.focus(), 0);
  }, []);

  const clearValue = () => {
    setValue?.(undefined);
    closeDroplist();
  };

  return (
    <Dropdown
      trigger='click'
      widthStrategy={widthStrategy}
      placement={placement}
      outsideClick
      triggerRef={localRef}
      open={open}
      onOpenChange={setOpen}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      content={typeof content === 'function' ? content({ closeDroplist, value, onChange: setValue }) : content}
    >
      <ChipChoiceBase
        {...rest}
        valueToRender={valueRender?.(value) ?? value}
        onClearButtonClick={clearValue}
        ref={localRef}
        value={value}
        size={size}
        onKeyDown={handleOnKeyDown()}
      />
    </Dropdown>
  );
}

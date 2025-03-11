import { forwardRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Droplist } from '@snack-uikit/list';

import { NativeDroplistProps } from '../../types';
import { ButtonField, ButtonFieldProps } from '../ButtonField';
import { getPlacement } from './helpers';
import styles from './styles.module.scss';

type ButtonFieldListProps = Omit<ButtonFieldProps, 'arrowOpen' | 'hasArrow'> & NativeDroplistProps;

export const ButtonFieldList = forwardRef<HTMLButtonElement, ButtonFieldListProps>(
  ({ items, selection, open, onOpenChange, search, scroll, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);
    const placement = getPlacement(rest);

    return (
      <Droplist
        data-test-id='button-field-list'
        items={items}
        selection={{ mode: 'single', ...selection }}
        open={isOpen}
        onOpenChange={setIsOpen}
        closeDroplistOnItemClick={true}
        search={search}
        scroll={scroll}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        triggerElemRef={ref}
        size={rest.size}
        placement={placement}
      >
        <ButtonField {...rest} hasArrow={true} arrowOpen={isOpen} className={styles.triggerClassName} />
      </Droplist>
    );
  },
);

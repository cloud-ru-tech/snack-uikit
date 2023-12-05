import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist, DroplistProps } from '../src';
import { DroplistItemMultipleProps } from '../src/components/DroplistItem';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Droplist/Droplist Multiple',
  component: Droplist,
};
export default meta;

type StoryProps = DroplistProps;

const SUBLIST_OPTIONS = ['Item 2-1', 'Item 2-2', 'Item 2-3', 'Item 2-4'];

const Template: StoryFn<StoryProps> = args => {
  const [selected, setSelected] = useState(['Item 1']);
  const [isOpen, setIsOpen] = useState(false);

  const {
    firstElementRefCallback,
    handleDroplistFocusLeave,
    handleTriggerKeyDown,
    handleDroplistItemKeyDown,
    triggerElementRef,
  } = Droplist.useKeyboardNavigation<HTMLButtonElement>({ setDroplistOpen: setIsOpen });

  const getProps = (option: string): DroplistItemMultipleProps => ({
    option,
    onClick: () => {
      setSelected(state => (state.includes(option) ? state.filter(op => op !== option) : [...state, option]));
    },
    onKeyDown: handleDroplistItemKeyDown,
    checked: selected.includes(option),
  });

  const handleClickForSublist = (sublistOptions: string[]) => {
    const setOptions = new Set(selected);
    const isIncluded = sublistOptions.every(el => selected.includes(el));
    if (isIncluded) {
      setSelected(state => state.filter(op => !setOptions.has(op)));
    } else {
      setSelected(state => [...state, ...sublistOptions]);
    }
  };

  const sublistProps = useMemo(() => {
    const checked = SUBLIST_OPTIONS.every(op => selected.includes(op));
    const sublistSelectedCount = selected.filter(option => SUBLIST_OPTIONS.includes(option)).length;
    const indeterminate = sublistSelectedCount > 0 && sublistSelectedCount < SUBLIST_OPTIONS.length;
    return { checked, indeterminate, hasChecked: checked || indeterminate };
  }, [selected]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <Droplist
          {...args}
          firstElementRefCallback={firstElementRefCallback}
          onFocusLeave={handleDroplistFocusLeave}
          open={isOpen}
          onOpenChange={setIsOpen}
          triggerRef={triggerElementRef}
          triggerElement={
            <ButtonFilled
              onKeyDown={handleTriggerKeyDown}
              className={styles.button}
              label='Click to see the droplist'
              data-test-id='button-with-droplist'
            />
          }
        >
          <Droplist.ItemMultiple {...getProps('Item 1')} />
          <Droplist.ItemMultiple
            option='Item 2'
            onClick={() => handleClickForSublist(SUBLIST_OPTIONS)}
            onKeyDown={handleDroplistItemKeyDown}
            {...sublistProps}
          >
            <Droplist.ItemMultiple {...getProps('Item 2-1')} onKeyDown={undefined} />
            <Droplist.ItemMultiple {...getProps('Item 2-2')} onKeyDown={undefined} />
            <Droplist.ItemMultiple {...getProps('Item 2-3')} onKeyDown={undefined} />
            <Droplist.ItemMultiple {...getProps('Item 2-4')} onKeyDown={undefined} />
          </Droplist.ItemMultiple>
          <Droplist.ItemMultiple {...getProps('Item 3')} />
          <Droplist.ItemMultiple {...getProps('Item 4')} />
          <Droplist.ItemMultiple {...getProps('Item 5')} />
          <Droplist.ItemMultiple {...getProps('Item 6')} />
          <Droplist.ItemMultiple {...getProps('Item 7')} />
          <Droplist.ItemMultiple {...getProps('Item 8')} />
          <Droplist.ItemMultiple {...getProps('Item 9')} />
        </Droplist>
      </div>
      <div style={{ opacity: 0 }}>{selected.join(', ')}</div>
    </div>
  );
};

export const droplistMultiple: StoryObj<StoryProps> = Template.bind({});

droplistMultiple.args = {
  useScroll: true,
  size: Droplist.sizes.S,
};

droplistMultiple.argTypes = {
  'data-test-id': { table: { disable: true } },
  open: { table: { disable: true } },
  className: { table: { disable: true } },
  triggerClassName: { table: { disable: true } },
  triggerRef: { table: { disable: true } },
  onFocusLeave: { table: { disable: true } },
  onOpenChange: { table: { disable: true } },
};

droplistMultiple.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GZSkePkicPQbtrYIu1F8GQ/Dropdown?type=design&node-id=0%3A1&t=H7kVBUAPq83jxLpg-1',
  },
};

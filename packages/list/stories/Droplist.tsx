import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';
import { PlusSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist, DroplistProps } from '../src/components';
import { DROPLIST_OPTIONS } from './contants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/List/Droplist',
  component: Droplist,
};
export default meta;

const STORY_SELECTION_MODE = {
  single: 'single',
  multiple: 'multiple',
  none: 'none',
};

type StoryProps = DroplistProps & {
  showFooter?: boolean;
  showSearch?: boolean;
  selectionMode: 'single' | 'multiple' | 'none';
};

const Template: StoryFn<StoryProps> = ({ showFooter, showSearch, selectionMode, ...args }) => {
  const [value, setValue] = useState<string | string[]>();

  useEffect(() => {
    setValue(selectionMode === 'single' ? undefined : []);
  }, [selectionMode]);

  const [search, setSearch] = useState<string>();

  const footerActiveItemRefs = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className={styles.wrapper}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Droplist
          className={styles.test}
          trigger={args.trigger}
          placement={args.placement}
          size={args.size}
          loading={args.loading}
          marker={args.marker}
          scroll={args.scroll}
          items={DROPLIST_OPTIONS}
          {...(selectionMode !== 'none'
            ? { selection: { value, onChange: setValue, mode: selectionMode } }
            : { selection: undefined })}
          data-test-id={args['data-test-id']}
          search={
            showSearch
              ? {
                  value: search,
                  onChange: setSearch,
                  placeholder: 'Placeholder',
                }
              : undefined
          }
          footerActiveElementsRefs={showFooter ? [footerActiveItemRefs] : undefined}
          footer={
            showFooter ? (
              <ButtonOutline
                className={styles.btn}
                ref={footerActiveItemRefs}
                icon={<PlusSVG />}
                label={'Edit'}
                data-test-id={'list__custom-footer'}
              />
            ) : undefined
          }
        >
          <ButtonFilled label={args.trigger} data-test-id='droplist-button-trigger' />
        </Droplist>
      </div>

      {selectionMode !== 'none' && Boolean(selectionMode === 'single' ? value : value && value.length > 0) && (
        <div>Value: {JSON.stringify(value, null, 2)}</div>
      )}
    </>
  );
};

export const droplist = Template.bind({});

droplist.args = {
  trigger: 'click',
  placement: 'bottom-start',
  widthStrategy: 'gte',
  size: 's',
  marker: true,
  scroll: true,
  loading: false,
  showFooter: true,
  showSearch: false,
  selectionMode: 'single',
};

droplist.argTypes = {
  showFooter: { name: '[Stories]: Show footer', control: { type: 'boolean' } },
  showSearch: { name: '[Stories]: Show search', control: { type: 'boolean' } },
  triggerElemRef: { table: { disable: true } },
  open: { table: { disable: true } },
  onOpenChange: { table: { disable: true } },
  items: { table: { disable: true } },
  pinTop: { table: { disable: true } },
  pinBottom: { table: { disable: true } },
  footer: { table: { disable: true } },
  selection: { table: { disable: true } },
  selectionMode: {
    name: '[Story]: selection Mode',
    options: Object.keys(STORY_SELECTION_MODE),
    mapping: STORY_SELECTION_MODE,
    control: {
      type: 'select',
    },
  },
  search: { table: { disable: true } },
  scrollRef: { table: { disable: true } },
  scrollContainerRef: { table: { disable: true } },
};

droplist.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.0.0?node-id=41%3A7631&mode=design',
  },
};

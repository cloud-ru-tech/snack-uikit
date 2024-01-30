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

type StoryProps = DroplistProps & {
  showFooter?: boolean;
  showSearch?: boolean;
};

const Template: StoryFn<StoryProps> = ({ showFooter, showSearch, ...args }) => {
  const [value, setValue] = useState<string | string[]>();

  useEffect(() => {
    setValue(args.selection === 'single' ? undefined : []);
  }, [args.selection]);

  const [search, setSearch] = useState<string>();

  const footerActiveItemRefs = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className={styles.wrapper}>
        <Droplist
          key={args.selection}
          selection={args.selection}
          trigger={args.trigger}
          placement={args.placement}
          size={args.size}
          loading={args.loading}
          marker={args.marker}
          scroll={args.scroll}
          items={DROPLIST_OPTIONS}
          value={value}
          onChange={setValue}
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

      {Boolean(args.selection === 'single' ? value : value && value.length > 0) && (
        <div>Value: {JSON.stringify(value, null, 2)}</div>
      )}
    </>
  );
};

export const droplist = Template.bind({});

droplist.args = {
  selection: 'single',
  trigger: 'click',
  placement: 'bottom-start',
  widthStrategy: 'gte',
  size: 's',
  marker: true,
  scroll: true,
  loading: false,
  showFooter: true,
  showSearch: false,
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
  value: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  search: { table: { disable: true } },
  onChange: { table: { disable: true } },
  scrollRef: { table: { disable: true } },
  scrollContainerRef: { table: { disable: true } },
  noData: { table: { disable: true } },
  noResults: { table: { disable: true } },
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

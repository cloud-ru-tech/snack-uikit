import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';
import { PlusSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { List, ListProps } from '../src/components';
import { BASE_OPTIONS, EXPAND_OPTIONS, GROUP_OPTIONS, LONG_LIST_OPTIONS } from './contants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/List/List',
  component: List,
};
export default meta;

type StoryProps = ListProps & {
  showSearch?: boolean;
  showPinTopItems?: boolean;
  showPinBottomItems?: boolean;
  showFooter?: boolean;
  showSwitch?: boolean;
  showGroups?: boolean;
  showEmptyList?: boolean;
  showCollapsedList?: boolean;
  showAsyncList?: boolean;
};

const Template: StoryFn<StoryProps> = ({
  showPinTopItems,
  showPinBottomItems,
  showSearch,
  showEmptyList,
  showFooter,
  showSwitch,
  showGroups,
  showCollapsedList,
  showAsyncList,
  ...args
}) => {
  const [value, setValue] = useState<string | string[]>();

  useEffect(() => {
    setValue(args.selection === 'single' ? undefined : []);
  }, [args.selection]);

  const [search, setSearch] = useState<string>();

  const groupItemsWithSwitch = useMemo(
    () =>
      GROUP_OPTIONS.map(group => ({
        ...group,
        items: group.items.map(item => ({ ...item, switch: showSwitch })),
      })),
    [showSwitch],
  );

  const baseItemsWithSwitch = useMemo(
    () => (showEmptyList ? [] : BASE_OPTIONS).map(item => ({ ...item, switch: showSwitch })),
    [showEmptyList, showSwitch],
  );

  const [items, setItems] = useState(LONG_LIST_OPTIONS);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLElement>(null);

  const observer = useRef<IntersectionObserver>();

  const fetchMore = async () => {
    setLoading(true);
    setTimeout(() => {
      setItems(items => items.concat(LONG_LIST_OPTIONS));

      setLoading(false);
    }, 1000);
  };

  const footerActiveItemRefs = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];

      if (target.isIntersecting) {
        setLoading(true);
        fetchMore();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

    if (scrollRef.current) {
      observer.current.observe(scrollRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [showAsyncList]);

  if (showAsyncList) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.listContainer}>
          Async List
          <List
            size={args.size}
            items={items}
            scroll
            loading={hasMore && loading}
            scrollRef={scrollRef}
            scrollContainerRef={scrollContainerRef}
            data-test-id={args['data-test-id']}
            footerActiveElementsRefs={[footerActiveItemRefs]}
            footer={
              <ButtonFilled
                ref={footerActiveItemRefs}
                className={styles.btn}
                label='Reset'
                onClick={() => {
                  setHasMore(true);
                  setItems([]);
                }}
              />
            }
          />
        </div>
      </div>
    );
  }

  if (showCollapsedList) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.listContainer}>
          Collapsed List
          <List items={EXPAND_OPTIONS} size={args.size} data-test-id={args['data-test-id']} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.listContainer}>
          Customizable List
          <List
            size={args.size}
            marker={args.marker}
            scroll={args.scroll}
            selection={args.selection}
            loading={args.loading}
            pinTop={showPinTopItems ? baseItemsWithSwitch : undefined}
            pinBottom={showPinBottomItems ? baseItemsWithSwitch : undefined}
            search={showSearch ? { value: search, onChange: setSearch, placeholder: 'Placeholder' } : undefined}
            items={showGroups ? groupItemsWithSwitch : baseItemsWithSwitch}
            value={value}
            onChange={setValue}
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
            data-test-id={args['data-test-id']}
          />
        </div>
      </div>
    </>
  );
};

export const list = Template.bind({});

list.args = {
  selection: 'single',
  showPinTopItems: true,
  showPinBottomItems: true,
  showSearch: true,
  showEmptyList: false,
  noData: 'No data',
  noResults: 'No results',
  showFooter: true,
  showSwitch: false,
  showGroups: true,
  marker: true,
  loading: false,
  scroll: true,
  size: 's',
  showCollapsedList: false,
  showAsyncList: false,
};

list.argTypes = {
  showPinTopItems: { name: '[Stories]: Show pinned top item', control: { type: 'boolean' } },
  showPinBottomItems: { name: '[Stories]: Show pinned bottom item', control: { type: 'boolean' } },
  showSearch: { name: '[Stories]: Show search', control: { type: 'boolean' } },
  showEmptyList: { name: '[Stories]: Show empty list', control: { type: 'boolean' } },
  showFooter: { name: '[Stories]: Show footer', control: { type: 'boolean' } },
  showSwitch: { name: '[Stories]: Show switch in items', control: { type: 'boolean' } },
  showGroups: { name: '[Stories]: Show group items', control: { type: 'boolean' } },
  showCollapsedList: { name: '[Stories]: Show collapsed list', control: { type: 'boolean' } },
  showAsyncList: { name: '[Stories]: Show async list', control: { type: 'boolean' } },
  items: { table: { disable: true } },
  pinTop: { table: { disable: true } },
  pinBottom: { table: { disable: true } },
  footer: { table: { disable: true } },
  search: { table: { disable: true } },
  scrollRef: { table: { disable: true } },
  scrollContainerRef: { table: { disable: true } },
  value: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  onChange: { table: { disable: true } },
};

list.parameters = {
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

import { Meta, StoryFn } from '@storybook/react';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Droplist, ItemSingleProps } from '@snack-uikit/droplist';
import { Scroll } from '@snack-uikit/scroll';
import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Search, SearchProps } from '../src';
import { SIZE } from '../src/constants';
import { TEST_ID_SUBMIT_TOASTER } from './constants';
import { generateOptions } from './helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Search',
  component: Search,
};
export default meta;

const Template: StoryFn<SearchProps> = ({ autocomplete, ...args }: SearchProps) => {
  const [value, setValue] = useState<string>(args.value || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<ItemSingleProps[]>([]);
  const [searchBeforeDebounce, setSearchBeforeDebounce] = useState<string>(value);

  const handleSearch = useCallback(
    async (value: string) => {
      if (searchBeforeDebounce !== value) {
        setSearchBeforeDebounce(value);
        setOptions(generateOptions(value));
        setLoading(false);
      }
    },
    [searchBeforeDebounce],
  );

  const handleSearchDebounced = useMemo(() => debounce(handleSearch, 300), [handleSearch]);

  const handleSearchChange = (value: string) => {
    setValue(value);
    handleSearchDebounced(value);
    setLoading(true);
  };

  const onSubmit = () => {
    toaster.userAction.success({ label: 'Submit action', 'data-test-id': TEST_ID_SUBMIT_TOASTER });
  };

  useEffect(
    () => handleSearchDebounced.cancel,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!args.value) {
      return;
    }

    setValue(args.value);
    setSearchBeforeDebounce(args.value);
    setOptions(generateOptions(args.value));
  }, [args.value]);

  if (autocomplete) {
    return (
      <div className={styles.wrapper} data-outline={args.outline || undefined}>
        <Search
          {...args}
          value={value}
          onChange={handleSearchChange}
          loading={loading || args.loading}
          options={options}
          onSubmit={onSubmit}
          autocomplete
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper} data-outline={args.outline || undefined}>
      <Search
        {...args}
        value={value}
        onChange={handleSearchChange}
        loading={loading || args.loading}
        autocomplete={undefined}
        options={undefined}
        onSubmit={onSubmit}
      />
      {options.length > 0 && (
        <div className={styles.scrollWrapper}>
          <Scroll className={styles.scroll}>
            <div className={styles.container}>
              {options.map(option => (
                <Droplist.ItemSingle {...option} key={option.option} className={styles.card} />
              ))}
            </div>
          </Scroll>
        </div>
      )}
    </div>
  );
};

export const search = Template.bind({});

search.args = {
  size: SIZE.S,
  placeholder: 'Placeholder',
  autocomplete: true,
  outline: true,
  'data-test-id': '',
};

search.argTypes = {
  options: {
    name: 'options',
    defaultValue: [],
    if: {
      arg: 'autocomplete',
      eq: true,
    },
  },
};

search.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A143287&mode=design',
  },
};

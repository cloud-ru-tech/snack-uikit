import { Meta, StoryFn } from '@storybook/react';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { Card } from '@snack-uikit/card';
import { PlaceholderSVG } from '@snack-uikit/icons';
import { BaseItemProps } from '@snack-uikit/list';
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

type StoryProps = SearchProps & {
  showPostfix: boolean;
};

const Template: StoryFn<StoryProps> = ({ autocomplete, showPostfix, ...args }: StoryProps) => {
  const [value, setValue] = useState<string>(args.value || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<BaseItemProps[]>([]);
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

  const postfix = useMemo(() => {
    if (!showPostfix) {
      return undefined;
    }

    return <ButtonFunction icon={<PlaceholderSVG />} />;
  }, [showPostfix]);

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
          postfix={postfix}
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
        postfix={postfix}
      />
      {options.length > 0 && (
        <div className={styles.scrollWrapper}>
          <Scroll className={styles.scroll}>
            <div className={styles.container}>
              {options.map(option => (
                <Card
                  key={option.id}
                  className={styles.card}
                  header={
                    <Card.Header
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      title={option.content.option}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      description={option.content.description}
                    />
                  }
                />
              ))}
            </div>
          </Scroll>
        </div>
      )}
    </div>
  );
};

export const search = {
  render: Template,

  args: {
    size: SIZE.S,
    placeholder: 'Placeholder',
    autocomplete: true,
    outline: true,
    showPostfix: true,
    'data-test-id': '',
  },

  argTypes: {
    options: {
      name: 'options',
      defaultValue: [],
      if: {
        arg: 'autocomplete',
        eq: true,
      },
    },
    showPostfix: {
      name: '[Stories]: Show postfix slot',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A143287&mode=design',
    },
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TagRow, TagRowProps } from '../src';
import { SIZE } from '../src/constants';
import { TagRowItemInner } from '../src/types';
import styles from './styles.module.scss';
import { generateFakeTags } from './utils';

const meta: Meta = {
  title: 'Components/Tag/Tag Row',
  component: TagRow,
};
export default meta;

type StoryProps = TagRowProps & {
  removableMode: boolean;
  demoTagsAmount: number;
  fullWidthMode: boolean;
  showTooltips: boolean;
};

const Template: StoryFn<StoryProps> = ({
  removableMode,
  demoTagsAmount,
  fullWidthMode,
  showTooltips,
  ...args
}: StoryProps) => {
  const generateParams = useMemo(
    () => ({ amountToGenerate: demoTagsAmount, char: 'x', charLimit: 5, includeTooltip: showTooltips }),
    [demoTagsAmount, showTooltips],
  );

  const [tags, setTags] = useState<TagRowItemInner[]>(generateFakeTags(generateParams));
  const removeTag = (item: TagRowItemInner['label']) => setTags(x => x.filter(({ label }) => label !== item));

  useEffect(() => {
    setTags(generateFakeTags(generateParams));
  }, [generateParams]);

  return (
    <div className={styles.tagRowWrapper} data-full-width={fullWidthMode}>
      <TagRow {...args} items={tags} onItemRemove={removableMode ? removeTag : undefined} />
    </div>
  );
};

export const tagRow: StoryObj<StoryProps> = {
  render: Template,

  args: {
    removableMode: false,
    demoTagsAmount: 50,
    size: SIZE.Xs,
    moreButtonLabel: 'More: ',
    rowLimit: 2,
    fullWidthMode: false,
  },

  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: {
        type: 'radio',
      },
    },
    removableMode: {
      name: '[Story]: Show remove mode',
      control: {
        type: 'boolean',
      },
    },
    demoTagsAmount: {
      name: '[Story]: Amount of demo tags',
      control: {
        type: 'number',
      },
    },
    fullWidthMode: {
      name: '[Story]: Full width mode',
      control: {
        type: 'boolean',
      },
    },
    showTooltips: {
      name: '[Stories] show tooltips',
      type: 'boolean',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A24551&mode=design',
    },
  },
};

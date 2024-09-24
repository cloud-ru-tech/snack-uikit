import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TruncateString, TruncateStringProps } from '../src';
import { VARIANT } from '../src/components/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Truncate String',
  component: TruncateString,
};
export default meta;

function Template({ ...args }: TruncateStringProps) {
  return (
    <div className={styles.wrapper}>
      <TruncateString {...args} className={styles.text} />
    </div>
  );
}

export const truncateString: StoryObj<TruncateStringProps> = {
  render: Template,

  args: {
    maxLines: 1,
    text: 'какой-то длинный текст который обрезается на самом интересном',
    hideTooltip: false,
    variant: 'end',
  },

  argTypes: {
    variant: {
      options: Object.values(VARIANT),
      mapping: VARIANT,
      control: {
        type: 'radio',
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};

import { Meta, Story } from '@storybook/react/types-6-0';
import cn from 'classnames';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Counter, CounterProps } from '../src';
import { DEFAULT_PLUS_LIMIT } from '../src/components/constants';
import styles from './styles.module.scss';

export default {
  title: 'Components/Counter',
  component: Counter,
} as Meta;

const Template: Story<CounterProps> = ({ ...args }) => {
  const sizes = Object.values(Counter.sizes);
  const appearances = Object.values(Counter.appearances);
  const variants = Object.values(Counter.variants);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <Counter {...args} />
      </div>

      <div className={styles.table}>
        <div className={styles.row}>
          <div className={headerCellClassnames} />
          {sizes.map(size => (
            <div key={size} className={headerCellClassnames} style={{ '--width': 3 }}>
              {size}
            </div>
          ))}
        </div>
        <div className={styles.row}>
          <div className={headerCellClassnames} />
          {variants.map(variant => (
            <div key={variant} className={headerCellClassnames}>
              {variant}
            </div>
          ))}
          {variants.map(variant => (
            <div key={variant} className={headerCellClassnames}>
              {variant}
            </div>
          ))}
        </div>
        {appearances.map(appearance => (
          <div key={appearance} className={styles.row}>
            <div className={headerCellClassnames}>{appearance}</div>
            {variants.map(variant => (
              <div key={variant} className={styles.cell}>
                <Counter
                  value={variant === Counter.variants.Count ? 9 : 9000}
                  size={Counter.sizes.S}
                  variant={variant}
                  appearance={appearance}
                />
              </div>
            ))}
            {variants.map(variant => (
              <div key={variant} className={styles.cell}>
                <Counter
                  value={variant === Counter.variants.Count ? 9 : 9000}
                  size={Counter.sizes.M}
                  variant={variant}
                  appearance={appearance}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export const counter = Template.bind({});

counter.args = {
  value: 9,
  appearance: Counter.appearances.Primary,
  size: Counter.sizes.S,
  variant: Counter.variants.Count,
  plusLimit: DEFAULT_PLUS_LIMIT,
};

counter.argTypes = {
  value: { type: 'number' },
  appearance: { control: { type: 'select' } },
  size: { control: { type: 'select' } },
  variant: { control: { type: 'select' } },
};

counter.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/6nTzKikd14uwVp3CJ6kNRS/Counter?t=bjoKDMpxpD433EAk-0',
  },
};
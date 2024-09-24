import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Counter, CounterProps } from '../src';
import { APPEARANCE, DEFAULT_PLUS_LIMIT, SIZE, VARIANT } from '../src/components/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Counter',
  component: Counter,
};
export default meta;

type StoryProps = CounterProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const sizes = Object.values(SIZE);
  const appearances = Object.values(APPEARANCE);
  const variants = Object.values(VARIANT);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <Counter {...args} />
      </div>

      <div className={styles.table}>
        <div className={headerCellClassnames} style={{ gridRow: '1 / 3' }} />
        {sizes.map((size, index) => (
          <div
            key={size}
            className={headerCellClassnames}
            style={{ gridColumnStart: index * 3 + 2, gridColumnEnd: index * 3 + 5 }}
          >
            {size}
          </div>
        ))}
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
        {appearances.map(appearance => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>
            {variants.map(variant => (
              <div key={variant} className={styles.cell}>
                <Counter
                  value={variant === VARIANT.Count ? 9 : 9000}
                  size={SIZE.S}
                  variant={variant}
                  appearance={appearance}
                  color={args.color}
                />
              </div>
            ))}
            {variants.map(variant => (
              <div key={variant} className={styles.cell}>
                <Counter
                  value={variant === VARIANT.Count ? 9 : 9000}
                  size={SIZE.M}
                  variant={variant}
                  appearance={appearance}
                  color={args.color}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const counter: StoryObj<StoryProps> = {
  render: Template,

  args: {
    value: 9,
    appearance: APPEARANCE.Primary,
    size: SIZE.S,
    variant: VARIANT.Count,
    plusLimit: DEFAULT_PLUS_LIMIT,
    color: 'accent',
  },

  argTypes: {
    value: { type: 'number' },
    appearance: { control: { type: 'radio' } },
    size: { control: { type: 'radio' } },
    variant: { control: { type: 'radio' } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=7%3A4148&mode=design',
    },
  },
};

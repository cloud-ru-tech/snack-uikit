import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { Link } from '@snack-ui/link';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { QuestionTooltip, QuestionTooltipProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: QuestionTooltip,
};
export default meta;

type StoryProps = QuestionTooltipProps;

const headerCellClassnames = cn(styles.cell, styles.headerCell);
const SIZES = Object.values(QuestionTooltip.sizes);

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <>
    <div className={styles.table} style={{ '--columns': SIZES.length - 1 }}>
      {SIZES.map(head => (
        <div key={head} className={headerCellClassnames}>
          {head}
        </div>
      ))}

      {SIZES.map(size => (
        <Fragment key={size}>
          <div className={styles.cell}>
            <QuestionTooltip
              {...args}
              size={size}
              tip={
                args.tip || (
                  <div>
                    do not press this button, please
                    <br /> <Link href='#' text='read why' />
                  </div>
                )
              }
            />
          </div>
        </Fragment>
      ))}
    </div>
  </>
);

export const questionTooltip: StoryObj<StoryProps> = Template.bind({});
questionTooltip.args = {
  size: QuestionTooltip.sizes.S,
};
questionTooltip.argTypes = { tip: { type: 'string' } };

questionTooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/PsHlbVIIO6j4VTPvr1uPJH/Tooltip',
  },
  a11y: {
    element: `.${styles.story}`,
  },
};

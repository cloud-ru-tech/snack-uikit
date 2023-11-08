import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import { ButtonFunction } from '@snack-ui/button';
import { PlaceholderSVG } from '@snack-ui/icons';
import { toaster } from '@snack-ui/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AccordionPrimary, CollapseBlockProps } from '../src';
import { TEST_IDS } from '../src/testIds';
import { COLLAPSE_BLOCK_STORY_SETTINGS } from './constants';
import { Content } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Accordion/CollapseBlockPrimary',
  component: AccordionPrimary.CollapseBlock,
};

export default meta;

type StoryProps = CollapseBlockProps & {
  showTip: boolean;
  showActions: boolean;
  expanded: boolean;
};

const Template: StoryFn<StoryProps> = (args: StoryProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setExpanded(() => {
      if (!args.expanded) {
        return null;
      }

      return args.id;
    });
  }, [args.expanded, args.id]);

  const actions = useMemo(() => {
    if (args.showActions) {
      return (
        <ButtonFunction
          icon={<PlaceholderSVG />}
          size={ButtonFunction.sizes.Xs}
          data-test-id={TEST_IDS.actions}
          onClick={e => {
            e.stopPropagation();
            toaster.userAction.neutral({ label: 'Actions click' });
          }}
        />
      );
    }
  }, [args.showActions]);

  return (
    <div className={styles.wrapper}>
      <AccordionPrimary expanded={expanded} onExpandedChange={setExpanded} data-test-id={TEST_IDS.accordion}>
        <AccordionPrimary.CollapseBlock {...args} actions={actions}>
          <Content />
        </AccordionPrimary.CollapseBlock>
      </AccordionPrimary>
    </div>
  );
};

export const collapseBlockPrimary: StoryObj<StoryProps> = Template.bind({});

collapseBlockPrimary.args = COLLAPSE_BLOCK_STORY_SETTINGS.args;

collapseBlockPrimary.argTypes = COLLAPSE_BLOCK_STORY_SETTINGS.argTypes as Partial<ArgTypes<StoryProps>>;

collapseBlockPrimary.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/PLxRHPp6Bf8clK1s3cCkaW/branch/wX8Tuyy2r7ORTERVQuMNmO/Accordion?type=design&node-id=0%3A1&mode=dev',
  },
};
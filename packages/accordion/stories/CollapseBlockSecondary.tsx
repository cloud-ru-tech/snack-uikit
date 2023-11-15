import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import { ButtonFunction } from '@snack-ui/button';
import { PlaceholderSVG } from '@snack-ui/icons';
import { toaster } from '@snack-ui/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AccordionSecondary, CollapseBlockProps } from '../src';
import { CollapseBlockHeaderProps } from '../src/helperComponents';
import { TEST_IDS } from '../src/testIds';
import { COLLAPSE_BLOCK_STORY_SETTINGS } from './constants';
import { Content, CustomHeader } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Accordion/CollapseBlockSecondary',
  component: AccordionSecondary.CollapseBlock,
};

export default meta;

type StoryProps = CollapseBlockProps & {
  showTip: boolean;
  showActions: boolean;
  expanded: boolean;
  customHeader: boolean;
  name?: string;
  metadata?: string;
} & CollapseBlockHeaderProps;

const Template: StoryFn<StoryProps> = ({ id, showActions, customHeader, ...args }: StoryProps) => {
  const [expanded, setExpanded] = useState<string>();

  useEffect(() => {
    setExpanded(() => {
      if (!args.expanded) {
        return undefined;
      }

      return id;
    });
  }, [args.expanded, id]);

  const actions = useMemo(() => {
    if (showActions) {
      return (
        <ButtonFunction
          icon={<PlaceholderSVG />}
          data-test-id={TEST_IDS.actions}
          size={ButtonFunction.sizes.Xs}
          onClick={e => {
            e.stopPropagation();
            toaster.userAction.neutral({ label: 'Actions click' });
          }}
        />
      );
    }
  }, [showActions]);

  return (
    <div className={styles.wrapper}>
      <AccordionSecondary expanded={expanded} onExpandedChange={setExpanded}>
        <AccordionSecondary.CollapseBlock
          id={id}
          actions={actions}
          data-test-id={args['data-test-id']}
          header={customHeader ? <CustomHeader {...args} /> : <AccordionSecondary.CollapseBlockHeader {...args} />}
        >
          <Content />
        </AccordionSecondary.CollapseBlock>
      </AccordionSecondary>
    </div>
  );
};

export const collapseBlockSecondary: StoryObj<StoryProps> = Template.bind({});

collapseBlockSecondary.args = COLLAPSE_BLOCK_STORY_SETTINGS.args;

collapseBlockSecondary.argTypes = COLLAPSE_BLOCK_STORY_SETTINGS.argTypes as unknown as Partial<ArgTypes<StoryProps>>;

collapseBlockSecondary.parameters = {
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

import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AccordionPrimary, AccordionProps, AccordionSecondary } from '../src';
import { DEFAULT_PROPS, STORY_TEST_IDS } from './constants';
import { Content } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Accordion/AccordionPrimary',
  component: AccordionPrimary,
};

export default meta;

const Template: StoryFn<AccordionProps> = ({ mode }: AccordionProps) => {
  const [expanded, setExpanded] = useState<string | string[] | null>(
    mode === AccordionPrimary.modes.Single ? null : [],
  );

  useEffect(() => {
    setExpanded(mode === AccordionPrimary.modes.Single ? null : []);
  }, [mode]);

  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <AccordionPrimary expanded={expanded} onExpandedChange={setExpanded} mode={mode}>
        <AccordionPrimary.CollapseBlock
          id='1'
          data-test-id={STORY_TEST_IDS[0]}
          header={<AccordionPrimary.CollapseBlockHeader {...DEFAULT_PROPS} />}
        >
          <AccordionSecondary mode={mode}>
            {Array.from({ length: 2 }).map((_, i) => (
              <AccordionSecondary.CollapseBlock
                key={i}
                id={String(i)}
                header={<AccordionSecondary.CollapseBlockHeader {...DEFAULT_PROPS} />}
              >
                <Content />
              </AccordionSecondary.CollapseBlock>
            ))}
          </AccordionSecondary>
        </AccordionPrimary.CollapseBlock>

        <AccordionPrimary.CollapseBlock
          id='2'
          data-test-id={STORY_TEST_IDS[1]}
          header={<AccordionPrimary.CollapseBlockHeader {...DEFAULT_PROPS} />}
        >
          <AccordionSecondary mode={mode}>
            {Array.from({ length: 2 }).map((_, i) => (
              <AccordionSecondary.CollapseBlock
                key={i}
                id={String(i)}
                header={<AccordionSecondary.CollapseBlockHeader {...DEFAULT_PROPS} />}
              >
                <Content />
              </AccordionSecondary.CollapseBlock>
            ))}
          </AccordionSecondary>
        </AccordionPrimary.CollapseBlock>
      </AccordionPrimary>
    </div>
  );
};

export const accordionPrimary: StoryObj<AccordionProps> = Template.bind({});

accordionPrimary.args = {
  mode: AccordionPrimary.modes.Single,
};

accordionPrimary.argTypes = {};

accordionPrimary.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/PLxRHPp6Bf8clK1s3cCkaW/branch/wX8Tuyy2r7ORTERVQuMNmO/accordion?type=design&node-id=0%3A1&mode=dev',
  },
};

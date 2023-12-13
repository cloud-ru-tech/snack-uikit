import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AccordionProps, AccordionSecondary } from '../src';
import { SELECTION_MODE } from '../src/constants';
import { DEFAULT_PROPS, STORY_TEST_IDS } from './constants';
import { Content } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Accordion/AccordionSecondary',
  component: AccordionSecondary,
};

export default meta;

const Template: StoryFn<AccordionProps> = ({ selectionMode }: AccordionProps) => {
  const [expanded, setExpanded] = useState<string | string[] | undefined>(undefined);

  useEffect(() => {
    setExpanded(undefined);
  }, [selectionMode]);

  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <AccordionSecondary expanded={expanded} onExpandedChange={setExpanded} selectionMode={selectionMode}>
        {Array.from({ length: 2 }).map((_, i) => (
          <AccordionSecondary.CollapseBlock
            key={i}
            id={String(i)}
            header={<AccordionSecondary.CollapseBlockHeader {...DEFAULT_PROPS} />}
            data-test-id={STORY_TEST_IDS[i]}
          >
            <Content />
          </AccordionSecondary.CollapseBlock>
        ))}
      </AccordionSecondary>
    </div>
  );
};

export const accordionSecondary: StoryObj<AccordionProps> = Template.bind({});

accordionSecondary.args = {
  selectionMode: SELECTION_MODE.Single,
};

accordionSecondary.argTypes = {};

accordionSecondary.parameters = {
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

import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AccordionPrimary, AccordionProps, AccordionSecondary } from '../src';
import { SELECTION_MODE } from '../src/constants';
import { DEFAULT_PROPS, STORY_TEST_IDS } from './constants';
import { Content } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Accordion/AccordionPrimary',
  component: AccordionPrimary,
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
      <AccordionPrimary expanded={expanded} onExpandedChange={setExpanded} selectionMode={selectionMode}>
        <AccordionPrimary.CollapseBlock
          id='1'
          data-test-id={STORY_TEST_IDS[0]}
          header={<AccordionPrimary.CollapseBlockHeader {...DEFAULT_PROPS} />}
        >
          <AccordionSecondary selectionMode={selectionMode}>
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
          <AccordionSecondary selectionMode={selectionMode}>
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

export const accordionPrimary = {
  render: Template,

  args: {
    selectionMode: SELECTION_MODE.Single,
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A262646&mode=design',
    },
  },
};

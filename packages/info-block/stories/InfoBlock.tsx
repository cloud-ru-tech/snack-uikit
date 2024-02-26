import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { JSXElementConstructor, useMemo } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { PlaceholderSVG } from '@snack-uikit/icons';
import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InfoBlock, InfoBlockProps } from '../src';
import { BUTTON_PROPS, FOOTER_VARIANT, ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Info Block',
  component: InfoBlock,
};
export default meta;

type StoryProps = Omit<InfoBlockProps, 'icon'> & {
  icon: {
    decor: boolean;
    appearance: IconPredefinedProps['appearance'];
  };
  showIcon: boolean;
  chosenIcon: JSXElementConstructor<{ size?: number; className?: string }>;
  footerVariant: ValueOf<typeof FOOTER_VARIANT>;
};

const Template: StoryFn<StoryProps> = ({
  footer: footerProp,
  footerVariant,
  chosenIcon,
  icon,
  showIcon,
  ...args
}: StoryProps) => {
  const footer = useMemo(() => {
    if (footerProp) {
      return footerProp;
    }

    switch (footerVariant) {
      case FOOTER_VARIANT.custom:
        return 'Custom footer';
      case FOOTER_VARIANT.predefined:
        return <InfoBlock.Footer primaryButton={BUTTON_PROPS} secondaryButton={BUTTON_PROPS} />;
      case FOOTER_VARIANT.none:
      default:
        return undefined;
    }
  }, [footerProp, footerVariant]);

  return (
    <div className={styles.wrapperResize}>
      <InfoBlock {...args} icon={showIcon ? { ...icon, icon: chosenIcon } : undefined} footer={footer} />
    </div>
  );
};

export const infoBlock: StoryObj<StoryProps> = Template.bind({});

infoBlock.args = {
  title: 'Title',
  description: 'Description',
  size: 's',
  icon: {
    decor: true,
    appearance: 'primary',
  },
  align: 'vertical',
  showIcon: true,
  chosenIcon: PlaceholderSVG,
  footerVariant: FOOTER_VARIANT.predefined,
};

infoBlock.argTypes = {
  showIcon: {
    name: '[Stories]: Show icon',
  },
  description: {
    type: 'string',
  },
  chosenIcon: {
    name: '[Stories]: Choose icon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
    if: {
      arg: 'showIcon',
      eq: true,
    },
  },
  footerVariant: {
    name: '[Stories]: Preview footer variant',
    options: Object.values(FOOTER_VARIANT),
    control: {
      type: 'radio',
    },
  },
};

infoBlock.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?type=design&node-id=591%3A52&mode=design',
  },
};

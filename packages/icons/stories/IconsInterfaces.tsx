import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Sprite } from '../src';
import * as Icons from '../src/components';
import CustomSpriteSVG from './sprites/customSprite.symbol.svg';
import classnames from './styles.module.scss';

type StoryProps = {
  size?: number | string;
  applySprite?: boolean;
};

const meta: Meta = {
  title: 'Components/Icons/Interfaces',
};
export default meta;

const Template: StoryFn<StoryProps> = ({ size, applySprite }) => (
  <div className={classnames.wrapper}>
    {applySprite && <Sprite content={CustomSpriteSVG as unknown as string} />}

    {(Object.keys(Icons) as Array<keyof typeof Icons>).map(name => {
      const Icon = Icons[name];
      return (
        <div key={name} className={classnames.iconCard}>
          <Icon size={size} />
          {name}
        </div>
      );
    })}
  </div>
);

export const interfaces: StoryObj<StoryProps> = Template.bind({});

interfaces.args = {
  size: 24,
  applySprite: false,
};

interfaces.argTypes = {
  applySprite: {
    name: '[Story]: Apply custom sprite',
    type: 'boolean',
  },
  size: {
    type: 'number',
  },
};

interfaces.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/Ur8wo5KsEZzwsTWIHo29WG/Base-Icon?node-id=3%3A102&t=qCKiZ5yyQ2Eq95OX-0',
  },
};

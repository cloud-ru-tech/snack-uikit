import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import * as Icons from '../src';
import classnames from './styles.module.scss';

type StoryProps = {
  size?: number | string;
};

export default {
  title: 'Components/Icons/Interfaces',
} as Meta;

const Template: Story<StoryProps> = ({ size }) => (
  <div className={classnames.wrapper}>
    {Object.keys(Icons).map(name => {
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

export const interfaces = Template.bind({});

interfaces.args = {
  size: 24,
};

interfaces.argTypes = {
  size: {
    type: 'number',
  },
};

interfaces.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/Ur8wo5KsEZzwsTWIHo29WG/Base-Icon?node-id=3%3A102&t=qCKiZ5yyQ2Eq95OX-0',
  },
};

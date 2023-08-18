import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PromoTag, PromoTagProps } from '../src';
import { Appearance } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Promo Tag',
  component: PromoTag,
};
export default meta;

const storyTable = (
  <table>
    {Object.values(Appearance).map(appearance => (
      <tr key={appearance}>
        <td>{appearance}:</td>
        <td>
          <PromoTag appearance={appearance} text='Promo Tag' />
        </td>
      </tr>
    ))}
  </table>
);

const Template: StoryFn<PromoTagProps> = ({ ...args }: PromoTagProps) => (
  <>
    <div>
      <div className={styles.story}>
        controlled:&nbsp;
        <PromoTag {...args} />
      </div>
    </div>
    <div className={styles.story}>{storyTable}</div>
  </>
);

export const promoTag: StoryObj<PromoTagProps> = Template.bind({});

promoTag.args = {
  text: 'Promo tag',
  appearance: Appearance.Primary,
};

promoTag.argTypes = {};

promoTag.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/7lmt6ziBuiCBRcBZZUuTXv/Promo-Tag?type=design&node-id=0-1&mode=design&t=MlDYfY2nVmlZW9QG-0',
  },
};

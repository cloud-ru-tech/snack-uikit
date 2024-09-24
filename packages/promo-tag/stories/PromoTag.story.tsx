import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PromoTag, PromoTagProps } from '../src';
import { APPEARANCE } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Promo Tag',
  component: PromoTag,
};
export default meta;

const storyTable = (
  <table>
    {Object.values(APPEARANCE).map(appearance => (
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

export const promoTag: StoryObj<PromoTagProps> = {
  render: Template,

  args: {
    text: 'Promo tag',
    appearance: APPEARANCE.Primary,
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A27190&mode=design',
    },
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PromoTag, PromoTagProps } from '../src';
import { APPEARANCE, COLOR } from '../src/constants';
import styles from './styles.module.scss';

const beforeNode = <PlaceholderSVG data-test-id='before-node' size={24} />;
const afterNode = <PlaceholderSVG data-test-id='after-node' size={24} />;

const meta: Meta = {
  title: 'Components/Promo Tag',
  component: PromoTag,
};
export default meta;

type StoryProps = PromoTagProps & { showText: boolean; showBefore: boolean; showAfter: boolean; clickable: boolean };

const defaultClickHandler = () => alert('clicked');

const renderStoryTable = ({ showText, showBefore, showAfter, clickable, ...args }: StoryProps) => (
  <table>
    {Object.values(APPEARANCE).map(appearance => (
      <tr key={appearance}>
        <td>{appearance}:</td>
        <td>
          <PromoTag
            {...args}
            text={showText ? args.text : undefined}
            size={args.size as Exclude<PromoTagProps['size'], 'xxs'>}
            beforeContent={showBefore ? beforeNode : undefined}
            afterContent={showAfter ? afterNode : undefined}
            appearance={appearance}
            onClick={clickable ? defaultClickHandler : undefined}
          />
        </td>
      </tr>
    ))}
  </table>
);

const Template: StoryFn<StoryProps> = ({ showText, showBefore, showAfter, clickable, ...args }) => (
  <>
    <div>
      <div className={styles.story}>
        <table>
          <tr>
            <td>controlled:</td>
            <td>
              <PromoTag
                {...args}
                text={showText ? args.text : undefined}
                size={args.size as Exclude<PromoTagProps['size'], 'xxs'>}
                beforeContent={showBefore ? beforeNode : undefined}
                afterContent={showAfter ? afterNode : undefined}
                onClick={clickable ? defaultClickHandler : undefined}
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div className={styles.story}>{renderStoryTable({ showText, showBefore, showAfter, clickable, ...args })}</div>
  </>
);

export const promoTag: StoryObj<StoryProps> = {
  render: Template,

  args: {
    text: 'Promo Tag',
    showText: true,
    showBefore: true,
    showAfter: true,
    clickable: false,
    appearance: APPEARANCE.Neutral,
    color: COLOR.Accent,
    size: 'xxs',
  },

  argTypes: {
    showText: {
      name: '[Story]: Show text node',
      type: 'boolean',
    },
    showBefore: {
      name: '[Story]: Show beforeContent node',
      type: 'boolean',
    },
    showAfter: {
      name: '[Story]: Show afterContent node',
      type: 'boolean',
    },
    clickable: {
      name: '[Story]: Show behavior tag with onClick',
      type: 'boolean',
    },
    onClick: { table: { disable: true } },
    beforeContent: { table: { disable: true } },
    afterContent: { table: { disable: true } },
  },

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

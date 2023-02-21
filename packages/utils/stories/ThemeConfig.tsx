import { ButtonFilled } from '@snack-ui/button';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useDarkMode } from 'storybook-dark-mode';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';

export default {
  title: 'Theme Config',
} as Meta;

import cn from 'classnames';

import BrandThemes from '@sbercloud/figma-tokens/build/css/brand.module.css';

import { useThemeConfig } from '../src';
import classNames from './styles.module.scss';

enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

const themeMap = {
  [Theme.Light]: BrandThemes.light,
  [Theme.Dark]: BrandThemes.dark,
};

const Template: Story = () => {
  const isDark = useDarkMode();

  const theme1 = useThemeConfig({ themeMap, defaultTheme: isDark ? Theme.Dark : Theme.Light });
  const theme2 = useThemeConfig({ themeMap, defaultTheme: isDark ? Theme.Dark : Theme.Light });

  return (
    <div className={cn(theme1.themeClassName, classNames.themeWrapper)}>
      <div className={classNames.buttonWrapper}>
        <ButtonFilled onClick={() => theme1.changeTheme(Theme.Light)} label={'Light Theme'} />
        <ButtonFilled onClick={() => theme1.changeTheme(Theme.Dark)} label={'Dark Theme'} />
      </div>
      <div className={cn(theme2.themeClassName, classNames.themeWrapper)}>
        <div className={classNames.buttonWrapper}>
          <ButtonFilled onClick={() => theme2.changeTheme(Theme.Light)} label={'Light Theme'} />
          <ButtonFilled onClick={() => theme2.changeTheme(Theme.Dark)} label={'Dark Theme'} />
        </div>
      </div>
    </div>
  );
};

export const themeConfig = Template.bind({});
themeConfig.args = {};
themeConfig.argTypes = {};
themeConfig.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
};

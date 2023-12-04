import { Meta, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { useDarkMode } from 'storybook-dark-mode';

import { ButtonFilled } from '@snack-ui/button';
import BrandThemes from '@snack-uikit/figma-tokens/build/css/brand.module.css';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { useThemeConfig } from '../src';
import classNames from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Theme Config',
};
export default meta;
enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

const themeMap = {
  [Theme.Light]: BrandThemes.light,
  [Theme.Dark]: BrandThemes.dark,
};

function Template() {
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
}

export const themeConfig: StoryFn = Template.bind({});
themeConfig.args = {};
themeConfig.argTypes = {};
themeConfig.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
};

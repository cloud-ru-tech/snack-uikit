import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { ButtonFilled } from '@sbercloud/uikit-tokens-demo-button';
import { EXPORT_VARS } from '@sbercloud/uikit-tokens-demo-theme';
import { H1_STYLES, H3_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-tokens-demo-typography';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ConfigProvider, ConfigProviderProps, LanguageCodeType, Themes, useLanguage, useTheme } from '../src';

const { GREY } = EXPORT_VARS;

export default {
  title: 'Utils/Config Provider',
  component: ConfigProvider,
} as Meta;

const ConfigBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 12px;
`;

const Header = styled.h1`
  ${H1_STYLES};
`;

const TitleWrapper = styled.div`
  margin: 24px 0;
`;

const Title = styled.h3`
  ${H3_STYLES};
`;

const Caption = styled.span`
  ${TEXT_2_STYLES};
`;

const BACKGROUND_COLOR = '--story-config-provider-background-color';

const configProviderTheme = `
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${BACKGROUND_COLOR}: var(${GREY[0]});
    }
    body[data-theme='${Themes.PurpleDark}'] {
      ${BACKGROUND_COLOR}: var(${GREY[850]});
    }
    body[data-theme='${Themes.Green}'] {
      ${BACKGROUND_COLOR}: var(${GREY[0]});
    }
    body[data-theme='${Themes.GreenDark}'] {
      ${BACKGROUND_COLOR}: var(${GREY[850]});
    }
  }
`;

css`
  ${configProviderTheme}
`;

const Wrapper = styled.div`
  margin-top: 24px;
  padding: 24px;
  border-radius: 8px;
  background: var(${BACKGROUND_COLOR});
`;

const COLOR_MAP = {
  [Themes.Purple]: '#aaabfd',
  [Themes.PurpleDark]: '#5558fa',
  [Themes.Green]: '#07E897',
  [Themes.GreenDark]: '#157552',
};

const ThemeWrapper = styled.span<{ theme: Themes }>`
  color: ${props => COLOR_MAP[props.theme]};
`;

const Template: Story<ConfigProviderProps> = ({ ...args }) => {
  const { changeTheme, theme } = useTheme();
  const { languageCode, changeLanguage } = useLanguage();
  return (
    <ConfigProvider {...args}>
      <Wrapper>
        <Header>Theme Setting</Header>
        <TitleWrapper>
          <Title>
            Активная тема: <ThemeWrapper theme={theme}>{theme}</ThemeWrapper>
          </Title>
        </TitleWrapper>
        <TitleWrapper>
          <Title>Смена темы через changeTheme</Title>
          <Caption>(нажми на кнопку)</Caption>
        </TitleWrapper>
        <ConfigBody>
          <ButtonFilled onClick={() => changeTheme(Themes.Purple)} label='Purple Theme' />
          <ButtonFilled onClick={() => changeTheme(Themes.PurpleDark)} label='Purple Dark Theme' />
          <ButtonFilled onClick={() => changeTheme(Themes.Green)} label='Green Theme' />
          <ButtonFilled onClick={() => changeTheme(Themes.GreenDark)} label='Green Dark Theme' />
        </ConfigBody>
      </Wrapper>
      <Wrapper>
        <Header>Language Settings</Header>
        <TitleWrapper>
          <Title>
            Активный код языка: <ThemeWrapper theme={theme}>{languageCode}</ThemeWrapper>
          </Title>
        </TitleWrapper>
        <TitleWrapper>
          <Title>Смена языка через changeLanguage</Title>
          <Caption>(нажми на кнопку)</Caption>
        </TitleWrapper>
        <ConfigBody>
          <ButtonFilled onClick={() => changeLanguage(LanguageCodeType.ruRU)} label='ruRU' />
          <ButtonFilled onClick={() => changeLanguage(LanguageCodeType.enUS)} label='enUS' />
        </ConfigBody>
      </Wrapper>
    </ConfigProvider>
  );
};

export const configProvider = Template.bind({});
configProvider.args = {};
configProvider.argTypes = {};
configProvider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
};

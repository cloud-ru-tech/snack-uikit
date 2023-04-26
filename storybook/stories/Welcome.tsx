import { linkTo } from '@storybook/addon-links';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Link } from '@snack-ui/link';

import { Card } from './components';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Welcome',
};
export default meta;

const Template: StoryFn = () => (
  <div className={styles.page}>
    <Card header='Snack Uikit' onClick={linkTo('Documentation/Getting Started')}>
      <span>
        Библиотека компонентов
        <br />
        компании{' '}
        <Link text='Cloud' href='https://sbercloud.ru/' size={Link.sizes.M} onClick={e => e.stopPropagation()} /> и
        сообщества{' '}
        <Link
          text='TeamSnack'
          href='https://t.me/+tN0DDzHaDVc3M2Iy'
          onClick={e => e.stopPropagation()}
          size={Link.sizes.M}
        />
      </span>

      <div className={styles.imagesWrapper} style={{ '--image-height': '16px' }}>
        <img alt='lerna' src='https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg' />
        <img
          alt='coverage'
          src='https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/badges/master/coverage.svg?job=testcafe-coverage&key_text=coverage&&key_width=100/coverage.svg)](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/badges/master/coverage.svg?job=testcafe-coverage&key_text=coverage&&key_width=100'
        />
      </div>

      <div className={styles.imagesWrapper} style={{ '--image-height': '32px' }}>
        <img alt='Chrome' src='storybook/assets/GoogleChromeLogo.svg' />
        <img alt='Firefox' src='storybook/assets/FirefoxLogo.svg' />
        <img alt='Chromium' src='storybook/assets/ChromiumLogo.svg' />
        <img alt='Safari' src='storybook/assets/SafariBrowserLogo.svg' />
      </div>

      <div className={styles.imagesWrapper} style={{ '--image-height': '24px' }}>
        <img alt='cloud' src='storybook/assets/CloudFullLogo.svg' />
        &
        <img alt='teamsnack' src='storybook/assets/TeamSnack.jpg' />
      </div>
    </Card>

    <Card header='Contribution Guide' onClick={linkTo('Documentation/Contribution Guide')} />

    <Card header='Работа с иконками' onClick={linkTo('Documentation/Working With Icons')} />

    <Card header='Компоненты' onClick={linkTo('Components/Avatar')} />

    <Card
      header='Figma'
      image='https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
      href='https://www.figma.com/files/1101513230643708615/team/1194627249980298820/DS-(FF)'
    />

    <Card
      header='Figma Tokens'
      image='https://amzn.github.io/style-dictionary/assets/logo.png'
      href='https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/figma-tokens'
    />

    <Card
      header='Gitlab'
      image='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/144_Gitlab_logo_logos-512.png'
      href='https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit'
    />
  </div>
);

export const welcome: StoryObj = Template.bind({});
welcome.args = {};
welcome.argTypes = {};

import { linkTo } from '@storybook/addon-links';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Link } from '@snack-uikit/link';

import { Card, CloudRuFullLogo, GitHubLogo } from './components';
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
        компании <Link text='Cloud.ru' href='https://cloud.ru/' size='m' onClick={e => e.stopPropagation()} /> и
        сообщества{' '}
        <Link text='TeamSnack' href='https://t.me/+tN0DDzHaDVc3M2Iy' onClick={e => e.stopPropagation()} size='m' />
      </span>

      <div className={styles.imagesWrapper} style={{ '--image-height': '16px' }}>
        <img alt='lerna' src='https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg' />
        {/* TODO: вернуть когда переедем на github полностью <img
          alt='coverage'
        /> */}
      </div>

      <div className={styles.imagesWrapper} style={{ '--image-height': '32px' }}>
        <img alt='Chrome' src='storybook/assets/GoogleChromeLogo.svg' />
        <img alt='Firefox' src='storybook/assets/FirefoxLogo.svg' />
        <img alt='Chromium' src='storybook/assets/ChromiumLogo.svg' />
        <img alt='Safari' src='storybook/assets/SafariBrowserLogo.svg' />
      </div>

      <div className={styles.imagesWrapper} style={{ '--image-height': '24px' }}>
        <CloudRuFullLogo />
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
      // TODO: провалидировать
      href='https://www.figma.com/files/1101513230643708615/team/1194627249980298820/DS-(FF)'
    />

    <Card
      header='Figma Tokens'
      image='https://amzn.github.io/style-dictionary/assets/logo.png'
      // TODO: ссылка на npmjs
      href='https://npmjs.org/cloud-ru-tech/figma-tokens'
    />

    <Card header='GitHub' image={<GitHubLogo />} href='https://github.com/cloud-ru-tech/snack-uikit' />
  </div>
);

export const welcome: StoryObj = Template.bind({});
welcome.args = {};
welcome.argTypes = {};

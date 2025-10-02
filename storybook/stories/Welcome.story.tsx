import { linkTo } from '@storybook/addon-links';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import { Link } from '@snack-uikit/link';

import { Card, GithubLogo } from './components';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Welcome',
};
export default meta;

const Template: StoryFn = () => {
  const isDark = useDarkMode();

  return (
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
          <img alt='Edge' src='storybook/assets/EdgeLogo.svg' />
          <img alt='Safari' src='storybook/assets/SafariBrowserLogo.svg' />
        </div>

        <div className={styles.imagesWrapper} style={{ '--image-height': '24px' }}>
          <img
            alt='Cloud.ru'
            src={isDark ? 'storybook/assets/CloudRuFullLogoDark.svg' : 'storybook/assets/CloudRuFullLogo.svg'}
          />
          &
          <img alt='teamsnack' src='storybook/assets/SnackUILogo.svg' />
        </div>
      </Card>

      <Card header='Contribution Guide' onClick={linkTo('Documentation/Contribution Guide')} />

      <Card header='Работа с иконками' onClick={linkTo('Documentation/Working With Icons')} />

      <Card header='Компоненты' onClick={linkTo('Components/Avatar')} />

      <Card
        header='Figma'
        image='https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
        href='https://www.figma.com/@TeamSnack'
      />

      <Card header='Figma Tokens' href='https://github.com/cloud-ru-tech/figma-tokens' />

      <Card header='GitHub' image={<GithubLogo />} href='https://github.com/cloud-ru-tech/snack-uikit' />
    </div>
  );
};

export const welcome: StoryObj = {
  render: Template,
};

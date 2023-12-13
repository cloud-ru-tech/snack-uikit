import { Meta, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { toaster, ToastSystemEventProps } from '../src';
import { ToastSystemEvent } from '../src/components';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Toaster/Toast SystemEvent',
  component: ToastSystemEvent,
};
export default meta;

const headerCellClassnames = cn(styles.cell, styles.headerCell);

const appearances = Object.values(ToastSystemEvent.appearances);

function Template({ ...args }: ToastSystemEventProps) {
  const { appearance = ToastSystemEvent.appearances.Neutral, ...rest } = args;

  return (
    <>
      <div className={styles.wrapper}>
        <ButtonFilled
          label={'Open toast controlled'}
          data-test-id='toast-trigger'
          onClick={() => toaster.systemEvent[appearance](rest)}
        />
      </div>

      <div className={styles.table} style={{ '--columns': 2 }}>
        <div className={headerCellClassnames} />
        <div className={headerCellClassnames}>Appearance</div>
        {appearances.map(appearance => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>

            <div className={cn(styles.cell, styles.toastContainer)}>
              <ToastSystemEvent {...rest} appearance={appearance} className={styles.systemEvent} data-test-id='' />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export const toastSystemEvent: StoryFn<ToastSystemEventProps> = Template.bind({});

toastSystemEvent.args = {
  appearance: ToastSystemEvent.appearances.Neutral,
  title: 'Title',
  description: 'Description',
  progressBar: true,
  closable: true,
  link: {
    text: 'Link text',
    href: '#',
  },
  onCloseClick: undefined,
};

toastSystemEvent.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VtbRcli4C9QbbiTqWsPIxr/branch/AwoYxH9F6HZG414pgPXXdD/Toaster',
  },
};

import { Meta, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { toaster, ToastSystemEventProps } from '../src';
import { ToastSystemEvent } from '../src/components';
import { TOAST_SYSTEM_EVENT_APPEARANCE } from '../src/components/ToastSystemEvent/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Toaster/Toast SystemEvent',
  component: ToastSystemEvent,
};
export default meta;

const headerCellClassnames = cn(styles.cell, styles.headerCell);

const appearances = Object.values(TOAST_SYSTEM_EVENT_APPEARANCE);

const DEFAULT_ACTION = [
  {
    label: 'Primary',
    onClick: () => {},
  },
  {
    label: 'Secondary',
    onClick: () => {},
  },
];

type StoryProps = ToastSystemEventProps & { showAction: boolean };

function Template({ ...args }: StoryProps) {
  const { appearance = 'neutral', showAction, ...rest } = args;

  return (
    <>
      <div className={styles.wrapper}>
        <ButtonFilled
          label={'Open toast controlled'}
          data-test-id='toast-trigger'
          onClick={() => toaster.systemEvent[appearance]({ action: showAction ? DEFAULT_ACTION : undefined, ...rest })}
        />

        <ButtonFilled
          label={'Dismiss Toasters'}
          data-test-id='toast-trigger'
          onClick={() => toaster.systemEvent.dismiss()}
        />
      </div>

      <div className={styles.table} style={{ '--columns': 2 }}>
        <div className={headerCellClassnames} />
        <div className={headerCellClassnames}>Appearance</div>
        {appearances.map(appearance => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>

            <div className={cn(styles.cell, styles.toastContainer)}>
              <ToastSystemEvent
                {...rest}
                appearance={appearance}
                className={styles.systemEvent}
                data-test-id=''
                action={showAction ? DEFAULT_ACTION : undefined}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export const toastSystemEvent: StoryFn<StoryProps> = Template.bind({});

toastSystemEvent.args = {
  appearance: 'neutral',
  title: 'Title truncate two line',
  description: 'Description truncate four line',
  progressBar: true,
  closable: true,
  link: {
    text: 'Link text',
    href: '#',
  },
  onCloseClick: undefined,
  showAction: true,
};

toastSystemEvent.argTypes = {
  showAction: {
    name: '[story] show action buttons',
  },
};

toastSystemEvent.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A196736&mode=design',
  },
};

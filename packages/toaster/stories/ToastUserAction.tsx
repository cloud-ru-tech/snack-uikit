import { Meta, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { toaster, ToastUserActionProps } from '../src';
import { ToastUserAction } from '../src/components/ToastUserAction';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Toaster/Toast UserAction',
  component: ToastUserAction,
};
export default meta;

const headerCellClassnames = cn(styles.cell, styles.headerCell);

const appearances = Object.values(ToastUserAction.appearances);

function Template({ ...args }: ToastUserActionProps) {
  const { appearance = ToastUserAction.appearances.Neutral, ...rest } = args;

  return (
    <>
      <div className={styles.wrapper}>
        <ButtonFilled
          label={'Open toast controlled'}
          data-test-id='toast-trigger'
          onClick={() => toaster.userAction[appearance](rest)}
        />
      </div>

      <div className={styles.table} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className={headerCellClassnames} style={{ gridRow: '1/3' }} />
        <div className={headerCellClassnames} style={{ gridColumn: '2/4' }}>
          Appearance
        </div>

        <div className={headerCellClassnames}>Label Only</div>
        <div className={headerCellClassnames}>With icon</div>

        {appearances.map(appearance => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>

            <div className={cn(styles.cell)}>
              <ToastUserAction {...rest} appearance={appearance} data-test-id='' link={undefined} />
            </div>

            <div className={cn(styles.cell)}>
              <ToastUserAction {...rest} appearance={appearance} data-test-id='' />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export const toastUserAction: StoryFn<ToastUserActionProps> = Template.bind({});

toastUserAction.args = {
  appearance: ToastUserAction.appearances.Neutral,
  label: 'Label',
  link: {
    text: 'Link text',
    href: '#',
  },
};

toastUserAction.parameters = {
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

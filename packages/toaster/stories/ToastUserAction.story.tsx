import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { toaster, ToastUserActionProps } from '../src';
import { ToastUserAction } from '../src/components';
import { TOAST_USER_ACTION_APPEARANCE } from '../src/components/ToastUserAction/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Toaster/Toast UserAction',
  component: ToastUserAction,
};
export default meta;

const headerCellClassnames = cn(styles.cell, styles.headerCell);

const appearances = Object.values(TOAST_USER_ACTION_APPEARANCE);

function Template({ ...args }: ToastUserActionProps) {
  const { appearance = 'neutral', ...rest } = args;

  return (
    <>
      <div className={styles.wrapper}>
        <ButtonFilled
          label={'Open toast controlled'}
          data-test-id='toast-trigger'
          onClick={() => toaster.userAction[appearance](rest)}
        />

        <ButtonFilled
          label={'Dismiss Toasters'}
          data-test-id='toast-trigger'
          onClick={() => toaster.userAction.dismiss()}
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
              <ToastUserAction {...rest} appearance={appearance} data-test-id='' link={undefined} loading={false} />
            </div>

            <div className={cn(styles.cell)}>
              <ToastUserAction {...rest} appearance={appearance} data-test-id='' loading={false} />
            </div>
          </Fragment>
        ))}

        <div className={headerCellClassnames}>Loading</div>

        <div className={cn(styles.cell)}>
          <ToastUserAction {...rest} data-test-id='' link={undefined} loading={true} />
        </div>

        <div className={cn(styles.cell)}>
          <ToastUserAction {...rest} data-test-id='' loading={true} />
        </div>
      </div>
    </>
  );
}

export const toastUserAction: StoryObj<ToastUserActionProps> = {
  render: Template,

  args: {
    appearance: 'neutral',
    loading: false,
    label: 'Label',
    link: {
      text: 'Link text',
      href: '#',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A197658&mode=design',
    },
  },
};

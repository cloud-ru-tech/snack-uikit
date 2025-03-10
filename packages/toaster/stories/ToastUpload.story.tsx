import { Meta, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { toaster } from '../src';
import { ToastUpload, ToastUploadProps } from '../src/components';
import { MOCK_TOAST_PROPS, MOCK_UPLOAD_ITEMS_LIST } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Toaster/Toast Upload',
  component: ToastUpload,
};
export default meta;

type StoryProps = ToastUploadProps;

function Template({ ...args }: StoryProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <ButtonFilled
          label='Open toast controlled'
          data-test-id='toast-trigger'
          onClick={() => toaster.upload.startOrUpdate({ ...args, files: args.files || MOCK_UPLOAD_ITEMS_LIST })}
        />

        <ButtonFilled
          label='Dismiss Toasters'
          data-test-id='toast-dismiss'
          onClick={() => toaster.userAction.dismiss()}
        />
      </div>

      <ToastUpload {...args} files={args.files || MOCK_UPLOAD_ITEMS_LIST} data-test-id='' />
    </>
  );
}

export const toastUpload: StoryObj<StoryProps> = {
  render: Template,

  args: MOCK_TOAST_PROPS,

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/jtGxAPvFJOMir7V0eQFukN/branch/qzePfVaHqZdDKogF2PYKRL/Snack-UI-Kit-5.0.0?node-id=17463-61268&t=O9Jb62r0iZv5zcdY-0',
    },
  },
};

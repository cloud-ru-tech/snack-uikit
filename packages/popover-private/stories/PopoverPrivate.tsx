import { Meta, Story } from '@storybook/react/types-6-0';
import { forwardRef, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PopoverPrivate, PopoverPrivateProps } from '../src';
import style from './styles.module.scss';

export default {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
} as Meta;

const CustomButton = () => <button>custom some button with text</button>;

const CustomButtonForwardRef = forwardRef<HTMLButtonElement>((_, ref) => (
  <button ref={ref}>custom some forwards ref</button>
));

const Template: Story<PopoverPrivateProps> = ({ ...args }) => (
  <div>
    <div className={style.storyContainer}>
      <PopoverPrivate
        {...args}
        popoverContent={<div className={style.content}>some tip here</div>}
        arrowClassName={style.arrow}
      >
        <button>some button with text</button>
      </PopoverPrivate>
    </div>
    <div className={style.storyContainer}>
      <PopoverPrivate
        {...args}
        popoverContent={<div className={style.content}>some tip here</div>}
        arrowClassName={style.arrow}
      >
        <CustomButton />
      </PopoverPrivate>
    </div>
    <div className={style.storyContainer}>
      <PopoverPrivate
        {...args}
        popoverContent={<div className={style.content}>some tip here</div>}
        arrowClassName={style.arrow}
      >
        <CustomButtonForwardRef />
      </PopoverPrivate>
    </div>
    <div className={style.storyContainer}>
      <PopoverPrivate
        {...args}
        popoverContent={<div className={style.content}>some tip here</div>}
        arrowClassName={style.arrow}
      >
        just text here
      </PopoverPrivate>
    </div>
    <div className={style.storyContainer}>
      <PopoverPrivate
        {...args}
        popoverContent={<div className={style.content}>some tip here</div>}
        arrowClassName={style.arrow}
      >
        <button>button1</button>
        <button>button2</button>
      </PopoverPrivate>
    </div>
    <div className={style.storyContainer}>
      <PopoverPrivate
        {...args}
        popoverContent={<div className={style.content}>some tip here</div>}
        arrowClassName={style.arrow}
      >
        {({ getReferenceProps, ref }) => (
          <div>
            <input ref={ref} {...getReferenceProps()}></input>
          </div>
        )}
      </PopoverPrivate>
    </div>
  </div>
);

export const popoverPrivate = Template.bind({});
popoverPrivate.args = {};
popoverPrivate.argTypes = {
  outsideClick: { type: 'boolean' },
};

export const PopoverControlled: Story<PopoverPrivateProps> = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={style.storyContainer}>
      <PopoverPrivate
        {...props}
        popoverContent={<div className={style.content}>some tip here</div>}
        open={isOpen}
        onOpenChange={(value: boolean) => setIsOpen(value)}
        arrowClassName={style.arrow}
      >
        <button>some button with text</button>
      </PopoverPrivate>
    </div>
  );
};
PopoverControlled.args = {};
PopoverControlled.argTypes = {};

export const PopoverOutsideClick: Story<PopoverPrivateProps> = ({ ...props }) => {
  // const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <div className={style.storyContainer}>
      <PopoverPrivate
        {...props}
        popoverContent={<div className={style.content}>outside clicks left: {3 - count}</div>}
        // open={isOpen}
        outsideClick={() => {
          if (count < 3) {
            setCount(value => value + 1);
            return false;
          }
          setCount(0);
          return true;
        }}
        // onOpenChange={(value: boolean) => setIsOpen(value)}
        arrowClassName={style.arrow}
        trigger={PopoverPrivate.triggers.Click}
      >
        <button>some button with text</button>
      </PopoverPrivate>
    </div>
  );
};
PopoverOutsideClick.args = {};
PopoverOutsideClick.argTypes = {};

popoverPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};

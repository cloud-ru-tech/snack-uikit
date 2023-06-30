import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { DaySVG } from '@snack-ui/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldSelect, FieldSelectProps } from '../src';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Select',
  component: FieldSelect,
};
export default meta;

const DEFAULT_OPTIONS: FieldSelectProps['options'] = [
  { value: 'op1', label: 'Option 1' },
  { value: 'op2', label: 'Option 2', description: 'Description' },
  { value: 'op3', label: 'Option 3', caption: 'Caption' },
  { value: 'op4', label: 'Option 4', tagLabel: 'Tag Label' },
  { value: 'op5', label: 'Option 5', disabled: true },
  { value: 'op11', label: 'Option 11', icon: <DaySVG /> },
  { value: 'op12', label: 'Option 12', avatar: { name: 'Will Wheaton' } },
];

const getValue = ({
  value,
  selectionMode,
}: {
  value?: string;
  selectionMode: FieldSelectProps['selectionMode'];
}): string | string[] => {
  const x = DEFAULT_OPTIONS.find(op => op.label === value)?.value;

  if (selectionMode === FieldSelect.selectionModes.Single) {
    return x ?? '';
  }

  return x ? [x] : [];
};

type StoryProps = FieldSelectProps & { value?: string; localeName: string };

const Template = ({ size, value: valueProp, selectionMode, localeName, ...args }: StoryProps) => {
  const locale = new Intl.Locale(localeName);

  const [value, setValue] = useState<string | string[]>(getValue({ value: valueProp, selectionMode }));
  const firstRender = useRef(true);

  useEffect(() => {
    setValue(getValue({ value: valueProp, selectionMode }));
  }, [selectionMode, valueProp]);

  useLayoutEffect(() => {
    if (firstRender.current) {
      return;
    }

    if (selectionMode === FieldSelect.selectionModes.Single) {
      setValue('');
    } else {
      setValue([]);
    }
  }, [selectionMode]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <div className={styles.wrapper} data-size={size}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <FieldSelect
        {...args}
        selectionMode={selectionMode}
        size={size}
        value={value}
        onChange={setValue}
        locale={locale}
      />
    </div>
  );
};

export const fieldSelect: StoryFn<StoryProps> = Template.bind({});

fieldSelect.args = {
  id: 'select',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selectionMode: FieldSelect.selectionModes.Single,
  value: undefined,
  placeholder: 'Placeholder',
  readonly: false,
  disabled: false,
  searchable: true,
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  required: false,
  hint: 'Hint text',
  size: FieldSelect.sizes.S,
  validationState: FieldSelect.validationStates.Default,
  options: DEFAULT_OPTIONS,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  prefixIcon: 'none',
  showCopyButton: true,
  localeName: 'en-US',
};

fieldSelect.argTypes = {
  value: {
    name: 'value',
    defaultValue: '',
    type: 'string',
    options: DEFAULT_OPTIONS.map(option => option.label),
    control: {
      type: 'select',
    },
  },
  prefixIcon: {
    name: 'prefixIcon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
  localeName: {
    options: ['ru-RU', 'en-US'],
    control: { type: 'radio' },
  },
};

fieldSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SYvC3aBKVp74sXjw9gJQpw/branch/sD5hKkFPUTZUqpvMwm1wY4/Fields?type=design&node-id=0-1&t=q929qY6j9vimlPMf-0',
  },
};

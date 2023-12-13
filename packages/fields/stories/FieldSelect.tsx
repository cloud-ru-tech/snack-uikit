import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { DaySVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldSelect, FieldSelectProps } from '../src';
import { SELECTION_MODE } from '../src/components/FieldSelect/constants';
import { COMMON_ARG_TYPES } from './constants';
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

const MORE_OPTIONS: FieldSelectProps['options'] = [
  { value: 'op13', label: 'Option 13' },
  { value: 'op14', label: 'Option 14' },
  { value: 'op15', label: 'Option 15' },
  { value: 'op16', label: 'Option 16' },
  { value: 'op17', label: 'Option 17' },
  { value: 'op18', label: 'Option 18' },
  { value: 'op19', label: 'Option 19' },
  { value: 'op20', label: 'Option 20' },
  { value: 'op21', label: 'Option 21' },
  { value: 'op22', label: 'Option 22' },
  { value: 'op23', label: 'Option 23' },
  { value: 'op24', label: 'Option 24' },
  { value: 'op25', label: 'Option 25' },
  { value: 'op26', label: 'Option 26' },
  { value: 'op27', label: 'Option 27' },
  { value: 'op28', label: 'Option 28' },
  { value: 'op29', label: 'Option 29' },
  { value: 'op30', label: 'Option 30' },
];

const getValue = ({
  value,
  selectionMode,
}: {
  value?: string;
  selectionMode: FieldSelectProps['selectionMode'];
}): string | string[] => {
  const x = DEFAULT_OPTIONS.find(op => op.label === value)?.value;

  if (selectionMode === SELECTION_MODE.Single) {
    return x ?? '';
  }

  return x ? [x] : [];
};

type StoryProps = FieldSelectProps & {
  value?: string;
  localeName: string;
  showMoreOptions: boolean;
};

const Template = ({ size, value: valueProp, selectionMode, localeName, showMoreOptions, ...args }: StoryProps) => {
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

    if (selectionMode === SELECTION_MODE.Single) {
      setValue('');
    } else {
      setValue([]);
    }
  }, [selectionMode]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const options = useMemo(
    () => (showMoreOptions ? [...args.options, ...MORE_OPTIONS] : args.options),
    [args.options, showMoreOptions],
  );

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
        options={options}
      />
    </div>
  );
};

export const fieldSelect: StoryFn<StoryProps> = Template.bind({});

fieldSelect.args = {
  id: 'select',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selectionMode: SELECTION_MODE.Single,
  value: undefined,
  placeholder: 'Placeholder',
  readonly: false,
  disabled: false,
  searchable: true,
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  required: false,
  hint: 'Hint text',
  size: 's',
  validationState: 'default',
  options: DEFAULT_OPTIONS,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  prefixIcon: 'none',
  showCopyButton: true,
  showMoreOptions: false,
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
  ...COMMON_ARG_TYPES,
  showMoreOptions: {
    name: '[Stories] add more options to see scroll',
    type: 'boolean',
  },
};

fieldSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SYvC3aBKVp74sXjw9gJQpw/branch/sD5hKkFPUTZUqpvMwm1wY4/Fields?type=design&node-id=0-1&t=q929qY6j9vimlPMf-0',
  },
};

import { IStringifyOptions, stringify } from 'qs';

const HEX_REGEXP = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i;
const COLOR_REGEXP = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i;

// eslint-disable-next-line
const encodeSpecialValues = (value: unknown): any => {
  if (value === undefined) return '!undefined';
  if (value === null) return '!null';
  if (typeof value === 'string') {
    if (HEX_REGEXP.test(value)) return `!hex(${value.slice(1)})`;
    if (COLOR_REGEXP.test(value)) return `!${value.replace(/[\s%]/g, '')}`;
    return value;
  }
  if (Array.isArray(value)) return value.map(encodeSpecialValues);
  if (typeof value === 'object') {
    return Object.entries(value).reduce(
      (acc, [key, val]) => Object.assign(acc, { [key]: encodeSpecialValues(val) }),
      {},
    );
  }
  return value;
};

const QS_OPTIONS: IStringifyOptions<true> = {
  encode: false,
  delimiter: ';',
  allowDots: true,
  format: 'RFC1738',
  serializeDate: (date: Date) => `!date(${date.toISOString()})`,
};

const buildArgsParam = (args: Record<string, unknown>): string =>
  stringify(encodeSpecialValues(args), QS_OPTIONS)
    .replace(/ /g, '+')
    .split(';')
    .map((part: string) => part.replace('=', ':'))
    .join(';');

export type StorybookUrlOptions = {
  name: string;
  group?: string;
  props?: Record<string, unknown>;
  story?: string;
  category?: string;
  globals?: Record<string, unknown>;
};

export function getStorybookUrl({
  name,
  group,
  props,
  story = name,
  category = 'components',
  globals,
}: StorybookUrlOptions): string {
  let propsString = '';
  let globalsString = '';

  if (props) {
    propsString = buildArgsParam(props);
  }

  if (globals) {
    globalsString = buildArgsParam(globals);
  }

  // Возвращаем относительный путь, так как baseURL уже настроен в конфиге
  return `iframe.html?id=${category}${group ? `-${group}` : ''}-${name}--${story}&viewMode=story${
    globalsString ? `&globals=${globalsString}` : ''
  }${propsString ? `&args=${propsString}` : ''}`;
}

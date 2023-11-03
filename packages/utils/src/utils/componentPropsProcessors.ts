import { AriaAttributes } from 'react';

const DATA_TEST_REGEXP = /^data-test-/;
const DATA_AND_ARIA_REGEXP = /^(data|aria)-/;

function excludeProps<T extends Record<string, unknown>>(props: T, regexp: RegExp) {
  return Object.keys(props)
    .filter(prop => !prop.match(regexp))
    .reduce(
      (nextProps, prop) => ({
        ...nextProps,
        [prop]: props[prop],
      }),
      {},
    );
}

function extractProps<T extends Record<string, unknown>>(props: T, regex: RegExp) {
  return Object.keys(props).reduce((nextProps, prop) => {
    if (prop.match(regex)) nextProps[prop] = props[prop];

    return nextProps;
  }, {} as Record<string, unknown>);
}

export type WithSupportProps<T> = {
  'data-test-id'?: string;
} & AriaAttributes &
  T;

export function excludeSupportProps<T extends Record<string, unknown>>(props: T) {
  return excludeProps(props, DATA_AND_ARIA_REGEXP);
}

export function extractDataTestProps<T extends Record<string, unknown>>(props: T) {
  return extractProps(props, DATA_TEST_REGEXP);
}

export function extractSupportProps<T extends Record<string, unknown>>(props: T) {
  return extractProps(props, DATA_AND_ARIA_REGEXP);
}

import { extractSupportProps } from '../src';

describe('extractSupportProps', () => {
  it('should extract support props', () => {
    const extractedProps = {
      'data-test-id': 'button',
      'data-test-x': 2,
      'aria-role': 'button',
      'aria-x': 2,
    };

    const otherProps = {
      'data-other-attr': 'text',
      'some-other-prop': 'text',
    };

    expect(extractSupportProps({ ...otherProps, ...extractedProps })).toEqual(extractedProps);
  });
});

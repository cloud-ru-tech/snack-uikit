import { fixture, Selector, test } from 'testcafe';

import { WithSupportProps } from '@snack-ui/utils';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { IconPosition } from '../src/constants';
import { CommonButtonProps } from '../src/types';

type ButtonTestSpec = {
  name: string;
  story: string;
  testId: string;
  iconBefore?: boolean;
};

const buttons: ButtonTestSpec[] = [
  {
    name: 'button-filled',
    story: 'button-filled',
    testId: 'button-filled',
  },
  {
    name: 'button-outline',
    story: 'button-outline',
    testId: 'button-outline',
  },

  {
    name: 'button-tonal',
    story: 'button-tonal',
    testId: 'button-tonal',
  },
  {
    name: 'button-support',
    story: 'button-support',
    testId: 'button-support',
    iconBefore: true,
  },
  {
    name: 'button-light',
    story: 'button-light',
    testId: 'button-light',
    iconBefore: true,
  },
];

buttons.forEach(({ name, story, testId, iconBefore }) => {
  const getPage = (props?: Partial<WithSupportProps<Omit<CommonButtonProps, 'icon'>> & { icon?: string }>) =>
    getTestcafeUrl({
      name,
      story,
      props: {
        'data-test-id': testId,
        testMode: true,
        ...props,
      },
      group: 'button',
    });

  fixture(story);

  test.page(getPage({ label: testId, icon: 'PlaceholderSVG' }))('Should render', async t => {
    const button = Selector(dataTestIdSelector(testId));
    await t.expect(button.exists).ok();
    const label = button.find(dataTestIdSelector('label'));
    await t.expect(label.exists).ok();
    const icon = button.find(dataTestIdSelector('icon'));
    await t.expect(icon.exists).ok();
  });

  test.page(getPage({ disabled: true }))('Should have data-disabled attribute', async t => {
    const button = Selector(dataTestIdSelector(testId));
    await t.expect(button.hasAttribute('data-disabled')).ok();
  });

  test.page(getPage({ loading: true }))('Should have data-loading attribute', async t => {
    const button = Selector(dataTestIdSelector(testId));
    await t.expect(button.hasAttribute('data-loading')).ok();
  });

  test.page(getPage({ label: 'label', icon: 'none' }))('Should have data-variant = "label-only"', async t => {
    const button = Selector(dataTestIdSelector(testId));
    await t.expect(button.getAttribute('data-variant')).eql('label-only');
  });

  test.page(getPage({ label: undefined, icon: 'none' }))('should have data-variant = "icon-only"', async t => {
    const button = Selector(dataTestIdSelector(testId));
    await t.expect(button.getAttribute('data-variant')).eql('icon-only');
  });

  test.page(getPage({ label: 'label', icon: 'PlaceholderSVG' }))('should have data-variant = "icon-after"', async t => {
    const button = Selector(dataTestIdSelector(testId));
    await t.expect(button.getAttribute('data-variant')).eql('icon-after');
  });

  if (iconBefore) {
    test.page(getPage({ label: 'label', icon: 'PlaceholderSVG', iconPosition: IconPosition.Before }))(
      'should have data-variant = "icon-before"',
      async t => {
        const button = Selector(dataTestIdSelector(testId));
        await t.expect(button.getAttribute('data-variant')).eql('icon-before');
      },
    );
  }

  test.page(getPage({ loading: true, label: 'label', icon: 'none' }))(
    'Should have label opacity = 0 with loading prop',
    async t => {
      const button = Selector(dataTestIdSelector(testId));
      const label = button.find(dataTestIdSelector('label'));
      await t.expect(label.getStyleProperty('opacity')).eql('0');
    },
  );

  test.page(getPage({ loading: true, label: 'label', icon: 'PlaceholderSVG' }))(
    'Should render loading-icon with loading & icon props ',
    async t => {
      const button = Selector(dataTestIdSelector(testId));
      const loadingIcon = button.find(dataTestIdSelector('loading-icon'));
      await t.expect(loadingIcon.exists).ok();
    },
  );

  test.page(getPage({ loading: true, label: 'label', icon: 'none' }))(
    'Should render loading-icon with loading prop ',
    async t => {
      const button = Selector(dataTestIdSelector(testId));
      const loadingIcon = button.find(dataTestIdSelector('loading-icon'));
      await t.expect(loadingIcon.exists).ok();
    },
  );

  test.page(getPage({ label: 'label', href: 'test' }))('Should render as <a>', async t => {
    await t.expect(Selector(`a[data-test-id="${testId}"]`).exists).ok();
  });

  test.page(getPage({ disabled: false, loading: false, label: 'label', icon: 'PlaceholderSVG' }))(
    'Should be clickable',
    async t => {
      const button = Selector(dataTestIdSelector(testId));
      const count = Selector(dataTestIdSelector('count'));

      await t.expect(button.getStyleProperty('cursor')).notEql('not-allowed');
      await t.click(button);
      await t.expect(count.innerText).eql('1');
    },
  );

  test.page(getPage({ disabled: true, label: 'label', icon: 'PlaceholderSVG' }))(
    'Should be disabled with disabled prop',
    async t => {
      const button = Selector(dataTestIdSelector(testId));
      const count = Selector(dataTestIdSelector('count'));

      await t.expect(button.getStyleProperty('cursor')).eql('not-allowed');
      await t.click(button);
      await t.expect(count.innerText).eql('0');
    },
  );

  test.page(getPage({ loading: true, label: 'label', icon: 'PlaceholderSVG' }))(
    'Should be disabled with loading prop',
    async t => {
      const button = Selector(dataTestIdSelector(testId));
      const count = Selector(dataTestIdSelector('count'));
      await t.expect(button.getStyleProperty('cursor')).eql('not-allowed');
      await t.click(button);
      await t.expect(count.innerText).eql('0');
    },
  );
});

import { ClientFunction, fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function isInViewport(selector: Selector) {
  const run = ClientFunction(
    () => {
      const element = selector() as unknown as HTMLElement;
      const clientRect = element.getBoundingClientRect();

      return (
        clientRect.top >= 0 &&
        clientRect.left >= 0 &&
        clientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        clientRect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    { dependencies: { selector } },
  );

  return run();
}

function getActive() {
  return Selector(() => document.activeElement as HTMLElement);
}

function getWrapper() {
  return Selector(dataTestIdSelector('tabs'));
}

function getTabButton(id: string) {
  return Selector(dataTestIdSelector(`tabs__tab-${id}`));
}

function getTabCounter(id: string) {
  return Selector(dataTestIdSelector(`tabs__tab-counter-${id}`));
}

function getTabContent(id: string) {
  return Selector(dataTestIdSelector(`tabs__tab-content-${id}`));
}

function getScrollButton(direction: 'left' | 'right') {
  return Selector(dataTestIdSelector(`tabs__scroll-button-${direction}`));
}

function isSelected(selector: Selector) {
  return selector.withAttribute('data-selected', 'true').exists;
}

function isDisabled(selector: Selector) {
  return selector.withAttribute('data-disabled', 'true').exists;
}

fixture('Tabs').page(getTestcafeUrl({ name: 'tabs', props: { 'data-test-id': 'tabs' } }));

test('renders correctly', async t => {
  await t.expect(getWrapper().exists).ok();
  await t.expect(getTabButton('tab1').exists).ok();
  await t.expect(getTabContent('tab1').exists).ok();
  await t.expect(getTabCounter('tab1').exists).ok();
  await t.expect(getScrollButton('right').exists).ok();
  await t.expect(getScrollButton('left').exists).notOk();
});

test('syncs selected tab with content', async t => {
  const tabButton = getTabButton('tab2');
  const content = getTabContent('tab2');

  await t
    .expect(isSelected(tabButton))
    .notOk()
    .expect(content.exists)
    .notOk()
    .click(tabButton)
    .expect(isSelected(tabButton))
    .ok()
    .expect(content.exists)
    .ok();
});

test('prevents disabled tab selection', async t => {
  const tabButton = getTabButton('tab1');
  const content = getTabContent('tab1');
  const disabledtabButton = getTabButton('tab3');
  const disabledContent = getTabContent('tab3');

  await t
    .expect(isSelected(tabButton))
    .ok()
    .expect(content.exists)
    .ok()
    .expect(isSelected(disabledtabButton))
    .notOk()
    .expect(disabledContent.exists)
    .notOk()
    .expect(isDisabled(disabledtabButton))
    .ok()
    .click(disabledtabButton)
    .expect(isSelected(tabButton))
    .ok()
    .expect(content.exists)
    .ok()
    .expect(isSelected(disabledtabButton))
    .notOk()
    .expect(disabledContent.exists)
    .notOk();
});

for (const key of ['Enter', 'Space']) {
  test(`selects focused tab via "${key}" keydown`, async t => {
    const tabButton1 = getTabButton('tab1');
    const content1 = getTabContent('tab1');
    const tabButton2 = getTabButton('tab2');
    const content2 = getTabContent('tab2');

    await t
      .expect(isSelected(tabButton1))
      .ok()
      .expect(content1.exists)
      .ok()
      .expect(isSelected(tabButton2))
      .notOk()
      .expect(content2.exists)
      .notOk()
      .pressKey('tab')
      .pressKey('tab')
      .dispatchEvent(getActive(), 'keydown', { code: key, bubbles: true })
      .expect(isSelected(tabButton1))
      .notOk()
      .expect(content1.exists)
      .notOk()
      .expect(isSelected(tabButton2))
      .ok()
      .expect(content2.exists)
      .ok();
  });
}

test('does not select focused tab via letters keydown', async t => {
  const tabButton1 = getTabButton('tab1');
  const content1 = getTabContent('tab1');
  const tabButton2 = getTabButton('tab2');
  const content2 = getTabContent('tab2');

  await t
    .expect(isSelected(tabButton1))
    .ok()
    .expect(content1.exists)
    .ok()
    .expect(isSelected(tabButton2))
    .notOk()
    .expect(content2.exists)
    .notOk()
    .pressKey('tab')
    .pressKey('tab')
    .pressKey('A a B b C c D d E e F f G g H h I i J j K k L l M m N n O o P p Q q R r S s T t U u V v W w X x Y y Z z')
    .expect(isSelected(tabButton1))
    .ok()
    .expect(content1.exists)
    .ok()
    .expect(isSelected(tabButton2))
    .notOk()
    .expect(content2.exists)
    .notOk();
});

test('move tabs on mouse scroll', async t => {
  const tabButton1 = getTabButton('tab1');
  const tabButton8 = getTabButton('tab8');
  const tabButton15 = getTabButton('tab15');

  await t.expect(isInViewport(tabButton1)).ok();
  await t.expect(isInViewport(tabButton15)).notOk();

  await t.hover(tabButton8).scroll(getWrapper().find('div'), 700, 0);

  await t.expect(isInViewport(tabButton1)).notOk();
  await t.expect(isInViewport(tabButton15)).ok();
});

test('move tabs on drag', async t => {
  const tabButton1 = getTabButton('tab1');
  const tabButton8 = getTabButton('tab8');
  const tabButton15 = getTabButton('tab15');

  await t.expect(isInViewport(tabButton1)).ok();
  await t.expect(isInViewport(tabButton15)).notOk();

  await t.click(tabButton8).drag(tabButton8, -700, 0);

  await t.expect(isInViewport(tabButton1)).notOk();
  await t.expect(isInViewport(tabButton15)).ok();
});

test('move tabs by arrows', async t => {
  const tabButton1 = getTabButton('tab1');
  const tabButton8 = getTabButton('tab8');
  const tabButton16 = getTabButton('tab16');

  await t.hover(tabButton8).scroll(getWrapper().find('div'), 200, 0);

  await t.expect(isInViewport(tabButton1)).notOk('1. tabButton1 should be hidden');
  await t.expect(isInViewport(tabButton16)).notOk('2. tabButton16 should be hidden');

  await t.click(getScrollButton('right'));

  await t.expect(isInViewport(tabButton1)).notOk('3. tabButton1 should be hidden');
  await t.expect(isInViewport(tabButton16)).ok('4. tabButton16 should be visible');

  await t.click(getScrollButton('left')).wait(300).click(getScrollButton('left'));

  await t.expect(isInViewport(tabButton1)).ok('5. tabButton1 should be visible');
  await t.expect(isInViewport(tabButton16)).notOk('6. tabButton16 should be hidden');
});

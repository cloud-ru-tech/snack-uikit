import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';

const TREE_TEST_ID = 'tree-test';

const ATTRIBUTES = {
  selected: 'aria-selected',
  dataDisabled: 'data-disabled',
  ariaDisabled: 'aria-disabled',
};

const selectors = {
  getTree: () => Selector(dataTestIdSelector(TREE_TEST_ID)),
  getNodes: (parent?: Selector) =>
    parent ? parent.find(dataTestIdSelector(TEST_IDS.node)) : Selector(dataTestIdSelector(TEST_IDS.node)),
  getNode: (index: number | 'all', { disabled, parent }: { disabled?: boolean; parent?: Selector } = {}) => {
    let node = selectors.getNodes(parent);

    if (disabled) {
      node = node.withAttribute(ATTRIBUTES.dataDisabled, 'true');
    }

    if (typeof index === 'number') {
      node = node.nth(index);
    }

    let item = node.find(dataTestIdSelector(TEST_IDS.item));

    if (disabled) {
      item = item.withAttribute(ATTRIBUTES.ariaDisabled, 'true');
    }

    const chevron = node.find(dataTestIdSelector(TEST_IDS.chevron));

    return {
      node,
      item,
      chevron,
      getChevronChildTestId: () => chevron.child().getAttribute('data-test-id'),
      line: node.find(dataTestIdSelector(TEST_IDS.line)),
      checkbox: node.find(dataTestIdSelector(TEST_IDS.checkbox)),
      checkboxIndeterminateAttribute: node
        .find(dataTestIdSelector(TEST_IDS.checkbox))
        .find('[data-indeterminate]')
        .getAttribute('data-indeterminate'),
      selectedAttribute: item.getAttribute(ATTRIBUTES.selected),
      expandableContent: node.find(dataTestIdSelector(TEST_IDS.expandableContent)),
      nodeActionsButton: node.find(dataTestIdSelector(TEST_IDS.droplistTrigger)),
      nodeActionsOption: Selector(dataTestIdSelector(TEST_IDS.droplistAction)),
    };
  },
};

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    name: 'tree',
    props: {
      'data-test-id': TREE_TEST_ID,
      ...props,
    },
  });
}

fixture('Tree');

test.page(getPage({ selectionMode: 'single', enableNodeActions: false }))(
  'Works correctly in SelectionMode=single and without NodeActions',
  async t => {
    const tree = selectors.getTree();

    await t.expect(tree.exists).ok('No tree rendered');

    const firstElement = selectors.getNode(0);

    await t.expect(firstElement.node.exists).ok('No nodes found');
    await t.expect(firstElement.checkbox.exists).notOk('Checkbox found in single mode');
    await t.expect(firstElement.nodeActionsButton.exists).notOk('Node actions should not exist');

    const secondElement = selectors.getNode(1);

    await t.expect(firstElement.selectedAttribute).eql('false');
    await t.expect(secondElement.selectedAttribute).eql('false');

    await t.click(firstElement.item);

    await t.expect(firstElement.selectedAttribute).eql('true');
    await t.expect(secondElement.selectedAttribute).eql('false');
    await t.expect(firstElement.expandableContent.exists).notOk('Node should be not expanded after click on it');

    await t.click(secondElement.item);

    await t.expect(firstElement.selectedAttribute).eql('false');
    await t.expect(secondElement.selectedAttribute).eql('true');

    // keyboard handling
    await t.pressKey('up');
    await t.expect(firstElement.item.focused).ok('First node should be focused');
    await t.pressKey('enter');

    await t.expect(firstElement.selectedAttribute).eql('true');
    await t.expect(secondElement.selectedAttribute).eql('false');

    await t.pressKey('down');
    await t.expect(secondElement.item.focused).ok('Second node should be focused');
    await t.pressKey('space');

    await t.expect(firstElement.selectedAttribute).eql('false');
    await t.expect(secondElement.selectedAttribute).eql('true');
  },
);

test.page(getPage())('Node actions exists and opens dropdown on click', async t => {
  const { nodeActionsOption, nodeActionsButton, item } = selectors.getNode(0);

  await t.expect(nodeActionsButton.exists).ok('No NodeActions button found');
  await t.expect(nodeActionsButton.visible).notOk('Node actions should not be visible');

  await t.hover(item);
  await t.expect(nodeActionsButton.visible).ok('Node actions should be visible after hover on item');

  await t.click(nodeActionsButton);

  await t.expect(nodeActionsOption.exists).ok('Dropdown actions should exist');

  await t.click(nodeActionsOption);

  await t.expect(nodeActionsOption.exists).notOk('Dropdown should be closed after click on option');
});

test.page(getPage({ selectionMode: 'single' }))('Nodes expand/collapse is working and lines are visible', async t => {
  const { node, chevron, getChevronChildTestId, expandableContent, line } = selectors.getNode('all');

  await t.expect(node.exists).ok('No nodes found');

  await t.expect(chevron.exists).ok('Chevron should exist for expandable node');
  await t.expect(expandableContent.exists).notOk('Node should be not expanded after click on it');

  const chevronChildTestIdBeforeClick = await getChevronChildTestId();
  await t.click(chevron);
  await t.expect(chevronChildTestIdBeforeClick).notEql(await getChevronChildTestId());
  await t.expect(expandableContent.exists).ok('Node should become expanded after click on Chevron');

  await t.expect(line.exists).ok('No tree line found');
  await t.expect(line.visible).ok('No tree line is visible');

  await t.click(chevron);
  await t.expect(expandableContent.exists).notOk('Node should become collapsed after second click on Chevron');
});

test.page(getPage({ showLines: false }))('Keyboard navigation by nodes and tree lines are not visible', async t => {
  const firstElement = selectors.getNode(0);
  const secondElement = selectors.getNode(1);
  const lastElement = selectors.getNode(-1);

  await t.expect(firstElement.node.exists).ok('No nodes found');

  await t.pressKey('tab');
  await t.expect(firstElement.item.focused).ok('First item is not focused');
  await t.expect(lastElement.item.focused).notOk('Last item should not be focused');

  await t.pressKey('tab');
  await t.expect(firstElement.item.focused).notOk('First item should not be focused');
  await t.expect(lastElement.item.focused).ok('Last item is not focused');

  await t.pressKey('shift+tab');
  await t.expect(firstElement.item.focused).ok('First item is not focused');
  await t.expect(lastElement.item.focused).notOk('Last item should not be focused');

  await t.pressKey('down');
  await t.expect(firstElement.item.focused).notOk('First node should not be focused after press "down" key');
  await t.expect(secondElement.item.focused).ok('Second node is not focused');

  await t.pressKey('up');
  await t.expect(firstElement.item.focused).ok('First node should be focused again after press "up" key');

  await t.pressKey('right');
  await t.expect(firstElement.expandableContent.exists).ok('First node should be expanded');

  await t.pressKey('right');
  await t.expect(firstElement.item.focused).notOk('Focus should move to function button');
  await t.expect(firstElement.nodeActionsButton.focused).ok('Node function button should be focused');

  await t.pressKey('left');
  await t.expect(firstElement.item.focused).ok('Focus should return to node');

  const firstNodeNestedNodes = selectors.getNode('all', { parent: firstElement.expandableContent });
  await t.expect(firstNodeNestedNodes.item.exists).ok('First node nested nodes should appear');
  await t.expect(firstElement.line.exists).ok('No tree line found in nested nodes');
  await t.expect(firstElement.line.visible).notOk('Tree line should not be visible');

  await t.pressKey('down');
  await t.expect(firstElement.item.focused).notOk('First node should not be focused after press "down" key');
  await t
    .expect(firstNodeNestedNodes.item.focused)
    .ok('First node nested item should be focused after press "down" key');

  await t.pressKey('up');
  await t.expect(firstElement.item.focused).ok('First node should be focused after press "up" key');
  await t.expect(secondElement.item.focused).notOk('Second node should not be focused');

  await t.pressKey('left');
  await t.expect(firstNodeNestedNodes.node.exists).notOk('First node nested should be removed');

  await t.pressKey('esc');
  await t.expect(firstElement.item.focused).notOk('First node should not be focused after press "esc" key');
});

test.page(getPage({ selectionMode: 'multi' }))('Works correctly in SelectionMode=multi', async t => {
  const tree = selectors.getTree();

  await t.expect(tree.exists).ok('No tree rendered');

  const firstElement = selectors.getNode(0);
  const secondElement = selectors.getNode(1);

  await t.expect(firstElement.node.exists).ok('No nodes found');

  await t.expect(firstElement.checkbox.exists).ok('Checkbox not found in multi mode');

  await t.expect(firstElement.selectedAttribute).eql('false');
  await t.expect(secondElement.selectedAttribute).eql('false');

  await t.click(firstElement.item);
  await t.expect(firstElement.selectedAttribute).eql('false', 'Node should not become selected after click');
  await t.expect(firstElement.expandableContent.exists).notOk('Node should be not expanded after click on it');

  await t.click(firstElement.checkbox);
  await t.expect(firstElement.selectedAttribute).eql('true');

  await t.click(secondElement.checkbox);
  await t.expect(secondElement.selectedAttribute).eql('true');

  // keyboard handling
  await t.pressKey('up');
  await t.expect(firstElement.item.focused).ok('First node should be focused');
  await t.pressKey('enter');

  await t.expect(firstElement.selectedAttribute).eql('false');
  await t.expect(secondElement.selectedAttribute).eql('true');

  await t.pressKey('down');
  await t.expect(secondElement.item.focused).ok('Second node should be focused');
  await t.pressKey('space');

  await t.expect(firstElement.selectedAttribute).eql('false');
  await t.expect(secondElement.selectedAttribute).eql('false');

  await t.pressKey('esc');
  await t.expect(secondElement.item.focused).notOk('Second node should not be focused');
});

test.page(getPage({ selectionMode: 'multi' }))(
  "Multi mode - select parent also selects it's children and become indeterminate selected if one of the is not selected",
  async t => {
    const { node, chevron, checkbox, selectedAttribute, checkboxIndeterminateAttribute, expandableContent } =
      selectors.getNode(0);

    await t.expect(node.exists).ok('No nodes found');

    await t.expect(checkbox.exists).ok('Checkbox not found in multi mode');

    await t.expect(selectedAttribute).eql('false');

    await t.click(chevron);
    await t.expect(expandableContent.exists).ok('Node should be expanded');

    await t.click(checkbox);
    await t.expect(selectedAttribute).eql('true', 'Node should be selected');
    await t.expect(checkboxIndeterminateAttribute).eql('false', 'Checkbox should not be in indeterminate state');

    const firstNestedNode = selectors.getNode(0, { parent: expandableContent });
    const secondNestedNode = selectors.getNode(1, { parent: expandableContent });

    await t.expect(firstNestedNode.selectedAttribute).eql('true', 'First nested nodes should be selected');
    await t.expect(secondNestedNode.selectedAttribute).eql('true', 'Second nested nodes should be selected');

    await t.click(firstNestedNode.checkbox);
    await t.expect(firstNestedNode.selectedAttribute).eql('false', 'First nested node should not be selected');
    await t.expect(selectedAttribute).eql('false', 'Node should not be selected after children deselect');
    await t.expect(checkboxIndeterminateAttribute).eql('true', 'Node should be in indeterminate state');

    await t.click(checkbox);
    await t.expect(checkboxIndeterminateAttribute).eql('false', 'Parent checkbox should not be in indeterminate state');
    await t.expect(selectedAttribute).eql('false', 'Parent node should not be selected');
    await t.expect(firstNestedNode.selectedAttribute).eql('false', 'First nested nodes should be not selected');
    await t.expect(secondNestedNode.selectedAttribute).eql('false', 'Second nested nodes should be not selected');
  },
);

test.page(getPage())('Disabled element works as expected', async t => {
  const disabledElement = selectors.getNode('all', { disabled: true });

  await t.expect(disabledElement.node.exists).ok('No disabled node found');

  await t.click(disabledElement.chevron);
  await t.expect(disabledElement.expandableContent.exists).notOk('Should not expand after click on chevron');

  await t.click(disabledElement.item);
  await t.expect(disabledElement.selectedAttribute).notEql('true', 'Should not select after click');

  await t.pressKey('space');
  await t.expect(disabledElement.selectedAttribute).notEql('true', 'Should not select after press "space" key');
  await t.expect(disabledElement.item.focused).eql(true, 'Should be focused');

  await t.pressKey('right');
  await t.expect(disabledElement.expandableContent.exists).notOk('Should not expand after press "right" key');
  await t
    .expect(disabledElement.nodeActionsButton.focused)
    .ok('Node actions should be focused after press "right" key');

  await t.pressKey('down');
  await t.expect(disabledElement.nodeActionsOption.exists).ok('Node actions should be available');

  await t.pressKey('left');
  await t.expect(disabledElement.nodeActionsOption.exists).notOk('Noe actions should be closed');
  await t.expect(disabledElement.nodeActionsButton.focused).notOk('Node actions button should not be focused');
  await t.expect(disabledElement.item.focused).eql(true, 'Item should be focused');

  await t.pressKey('esc');
  await t.expect(disabledElement.item.focused).eql(false, 'Item should not be focused after press "esc"');
});

test.page(getPage({ selectionMode: '!undefined' }))('selectionMode=undefined is not selecting anything', async t => {
  const firstElement = selectors.getNode(0);

  await t.expect(firstElement.node.exists).ok('No nodes found');
  await t.expect(firstElement.checkbox.exists).notOk('Checkbox found in disabled selectionMode');

  await t.expect(firstElement.selectedAttribute).eql(null);

  await t.click(firstElement.item);

  await t.expect(firstElement.selectedAttribute).eql(null);
});

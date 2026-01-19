import { expect, type Locator, type Page, test } from '../../../playwright/fixtures';
import { LINK_TEST_HREF, TEST_IDS } from '../src/constants';

const TREE_TEST_ID = 'tree-test';

const ATTRIBUTES = {
  selected: 'aria-selected',
  dataDisabled: 'data-disabled',
  ariaDisabled: 'aria-disabled',
};

const selectors = {
  getTree: (getByTestId: (testId: string) => Locator) => getByTestId(TREE_TEST_ID),
  getNodes: (page: Page, parent?: Locator) =>
    parent ? parent.locator(`[data-test-id="${TEST_IDS.node}"]`) : page.locator(`[data-test-id="${TEST_IDS.node}"]`),
  getNode: (
    page: Page,
    getByTestId: (testId: string) => Locator,
    index: number | 'all',
    { disabled, parent }: { disabled?: boolean; parent?: Locator } = {},
  ) => {
    let node: Locator;
    const nodeSelector = disabled
      ? `[data-test-id="${TEST_IDS.node}"][${ATTRIBUTES.dataDisabled}="true"]`
      : `[data-test-id="${TEST_IDS.node}"]`;

    if (parent) {
      node = parent.locator(nodeSelector);
    } else {
      const allNodes = page.locator(nodeSelector);
      node = allNodes;
    }

    if (typeof index === 'number') {
      node = node.nth(index);
    }

    const itemSelector = disabled
      ? `[data-test-id="${TEST_IDS.item}"][${ATTRIBUTES.ariaDisabled}="true"]`
      : `[data-test-id="${TEST_IDS.item}"]`;
    const item = node.locator(itemSelector);

    const chevron = node.locator(`[data-test-id="${TEST_IDS.chevron}"]`);

    return {
      node,
      item,
      chevron,
      getChevronChildTestId: async () => await chevron.locator('*').first().getAttribute('data-test-id'),
      line: node.locator(`[data-test-id="${TEST_IDS.line}"]`),
      checkbox: node.locator(`[data-test-id="${TEST_IDS.checkbox}"]`),
      radio: node.locator(`[data-test-id="${TEST_IDS.radio}"]`),
      checkboxIndeterminateAttribute: async () =>
        await node
          .locator(`[data-test-id="${TEST_IDS.checkbox}"]`)
          .locator('[data-indeterminate]')
          .first()
          .getAttribute('data-indeterminate'),
      selectedAttribute: async () => await item.first().getAttribute(ATTRIBUTES.selected),
      expandableContent: node.locator(`[data-test-id="${TEST_IDS.expandableContent}"]`),
      nodeActionsButton: node.locator(`[data-test-id="${TEST_IDS.droplistTrigger}"]`),
      nodeActionsOption: getByTestId(TEST_IDS.droplistAction),
      link: node.locator(`[data-test-id="${TEST_IDS.link}"]`),
    };
  },
};

const getTreeNodeById = (page: Page, id: string) => {
  const node = page.locator(`[data-node-id="${id}"]`);
  const container = node.locator('..');

  return {
    node,
    item: node.locator(`[data-test-id="${TEST_IDS.item}"]`),
    chevron: node.locator(`[data-test-id="${TEST_IDS.chevron}"]`),
    expandableContent: container.locator(`[data-test-id="${TEST_IDS.expandableContent}"]`),
    link: node.locator(`[data-test-id="${TEST_IDS.link}"]`),
  };
};

test.describe('Tree', () => {
  test('Works correctly in SelectionMode=single and without NodeActions', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
        selectionMode: 'single',
        enableNodeActions: false,
      },
    });
    const tree = selectors.getTree(getByTestId);

    await expect(tree, 'No tree rendered').toBeVisible();

    const firstElement = selectors.getNode(page, getByTestId, 0);

    await firstElement.item.click();

    expect(await firstElement.selectedAttribute(), 'item should be selected').toEqual('true');

    await firstElement.item.click();

    expect(await firstElement.selectedAttribute(), 'Item should be selected').toEqual('false');

    await expect(firstElement.node, 'No nodes found').toBeVisible();
    await expect(firstElement.checkbox, 'Checkbox found in single mode').not.toBeVisible();
    await expect(firstElement.nodeActionsButton, 'Node actions should not exist').not.toBeVisible();

    const secondElement = selectors.getNode(page, getByTestId, 1);

    expect(await firstElement.selectedAttribute()).toEqual('false');
    expect(await secondElement.selectedAttribute()).toEqual('false');

    await firstElement.item.click();
    expect(await firstElement.selectedAttribute()).toEqual('true');
    expect(await secondElement.selectedAttribute()).toEqual('false');
    await expect(firstElement.expandableContent, 'Node should be not expanded after click on it').not.toBeVisible();

    await secondElement.item.click();

    expect(await firstElement.selectedAttribute()).toEqual('false');
    expect(await secondElement.selectedAttribute()).toEqual('true');

    // keyboard handling
    await page.keyboard.press('ArrowUp');
    await expect(firstElement.item, 'First node should be focused').toBeFocused();
    await page.keyboard.press('Enter');

    expect(await firstElement.selectedAttribute()).toEqual('true');
    expect(await secondElement.selectedAttribute()).toEqual('false');

    await page.keyboard.press('ArrowDown');
    await expect(secondElement.item, 'Second node should be focused').toBeFocused();
    await page.keyboard.press(' ');

    expect(await firstElement.selectedAttribute()).toEqual('false');
    expect(await secondElement.selectedAttribute()).toEqual('true');
  });

  test('Works correctly in selectionMode=single showToggle=true', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
        selectionMode: true,
        showToggle: true,
      },
    });
    const firstElement = selectors.getNode(page, getByTestId, 0);

    await expect(firstElement.radio, 'Radio found in single selectionMode').toBeVisible();
  });

  test('Node actions exists and opens dropdown on click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
      },
    });
    const { nodeActionsOption, nodeActionsButton, item } = selectors.getNode(page, getByTestId, 0);

    await expect(nodeActionsButton, 'No NodeActions button found').toBeAttached();
    await expect(nodeActionsButton, 'Node actions should not be visible').not.toBeVisible();

    await item.hover();
    await expect(nodeActionsButton, 'Node actions should be visible after hover on item').toBeVisible();

    await nodeActionsButton.click();

    await expect(nodeActionsOption.first(), 'Dropdown actions should exist').toBeVisible();

    await nodeActionsOption.first().click();

    await expect(nodeActionsOption.first(), 'Dropdown should be closed after click on option').not.toBeVisible();
  });

  test('Nodes expand/collapse is working and lines are visible', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
        selectionMode: 'single',
      },
    });
    const { node, chevron, getChevronChildTestId, expandableContent, line } = selectors.getNode(
      page,
      getByTestId,
      'all',
    );

    await expect(node.first(), 'No nodes found').toBeVisible();

    await expect(chevron.first(), 'Chevron should exist for expandable node').toBeVisible();
    await expect(expandableContent.first(), 'Node should be not expanded after click on it').not.toBeVisible();

    const chevronChildTestIdBeforeClick = await getChevronChildTestId();
    await chevron.first().click();
    expect(chevronChildTestIdBeforeClick).not.toEqual(await getChevronChildTestId());
    await expect(expandableContent.first(), 'Node should become expanded after click on Chevron').toBeVisible();

    await expect(line.first(), 'No tree line found').toBeVisible();
    await expect(line.first(), 'No tree line is visible').toBeVisible();

    await chevron.first().click();
    await expect(
      expandableContent.first(),
      'Node should become collapsed after second click on Chevron',
    ).not.toBeVisible();
  });

  test('Keyboard navigation by nodes and tree lines are not visible', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
        showLines: false,
      },
    });
    const firstElement = selectors.getNode(page, getByTestId, 0);
    const secondElement = selectors.getNode(page, getByTestId, 1);
    const nodeCount = await selectors.getNodes(page).count();
    const lastElement = selectors.getNode(page, getByTestId, nodeCount - 1);

    await expect(firstElement.node, 'No nodes found').toBeVisible();

    await page.keyboard.press('Tab');
    await expect(firstElement.item, 'First item is not focused').toBeFocused();
    await expect(lastElement.item, 'Last item should not be focused').not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(firstElement.item, 'First item should not be focused').not.toBeFocused();
    await expect(lastElement.item, 'Last item is not focused').toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(firstElement.item, 'First item is not focused').toBeFocused();
    await expect(lastElement.item, 'Last item should not be focused').not.toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(firstElement.item, 'First node should not be focused after press "down" key').not.toBeFocused();
    await expect(secondElement.item, 'Second node is not focused').toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(firstElement.item, 'First node should be focused again after press "up" key').toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(firstElement.expandableContent, 'First node should be expanded').toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(firstElement.item.first(), 'Focus should move to function button').not.toBeFocused();
    await expect(firstElement.nodeActionsButton.first(), 'Node function button should be focused').toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(firstElement.item.first(), 'Focus should return to node').toBeFocused();

    const firstNodeNestedNodes = selectors.getNode(page, getByTestId, 'all', {
      parent: firstElement.expandableContent,
    });
    await expect(firstNodeNestedNodes.item.first(), 'First node nested nodes should appear').toBeVisible();
    await expect(firstElement.line.first(), 'No tree line found in nested nodes').toBeAttached();
    await expect(firstElement.line.first(), 'Tree line should not be visible').not.toBeVisible();

    await page.keyboard.press('ArrowDown');
    await expect(
      firstElement.item.first(),
      'First node should not be focused after press "down" key',
    ).not.toBeFocused();
    await expect(
      firstNodeNestedNodes.item.first(),
      'First node nested item should be focused after press "down" key',
    ).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(firstElement.item.first(), 'First node should be focused after press "up" key').toBeFocused();
    await expect(secondElement.item.first(), 'Second node should not be focused').not.toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(firstNodeNestedNodes.node.first(), 'First node nested should be removed').not.toBeVisible();

    await page.keyboard.press('Escape');
    await expect(firstElement.item.first(), 'First node should not be focused after press "esc" key').not.toBeFocused();
  });

  test('Works correctly in SelectionMode=multi', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
        selectionMode: 'multi',
      },
    });
    const tree = selectors.getTree(getByTestId);

    await expect(tree, 'No tree rendered').toBeVisible();

    const firstElement = selectors.getNode(page, getByTestId, 0);
    const secondElement = selectors.getNode(page, getByTestId, 1);

    await expect(firstElement.node, 'No nodes found').toBeVisible();

    await expect(firstElement.checkbox, 'Checkbox not found in multi mode').toBeVisible();

    expect(await firstElement.selectedAttribute()).toEqual('false');
    expect(await secondElement.selectedAttribute()).toEqual('false');

    await firstElement.item.click();
    expect(await firstElement.selectedAttribute(), 'Node should not become selected after click').toEqual('false');
    await expect(firstElement.expandableContent, 'Node should be not expanded after click on it').not.toBeVisible();

    await firstElement.checkbox.click();
    expect(await firstElement.selectedAttribute()).toEqual('true');

    await secondElement.checkbox.click();
    expect(await secondElement.selectedAttribute()).toEqual('true');

    // keyboard handling
    await page.keyboard.press('ArrowUp');
    await expect(firstElement.item, 'First node should be focused').toBeFocused();
    await page.keyboard.press('Enter');

    expect(await firstElement.selectedAttribute()).toEqual('false');
    expect(await secondElement.selectedAttribute()).toEqual('true');

    await page.keyboard.press('ArrowDown');
    await expect(secondElement.item, 'Second node should be focused').toBeFocused();
    await page.keyboard.press(' ');

    expect(await firstElement.selectedAttribute()).toEqual('false');
    expect(await secondElement.selectedAttribute()).toEqual('false');

    await page.keyboard.press('Escape');
    await expect(secondElement.item, 'Second node should not be focused').not.toBeFocused();
  });

  test("Multi mode - select parent also selects it's children and become indeterminate selected if one of the is not selected", async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
        selectionMode: 'multi',
      },
    });
    const { node, chevron, checkbox, selectedAttribute, checkboxIndeterminateAttribute, expandableContent } =
      selectors.getNode(page, getByTestId, 0);

    await expect(node, 'No nodes found').toBeVisible();

    await expect(checkbox, 'Checkbox not found in multi mode').toBeVisible();

    expect(await selectedAttribute()).toEqual('false');

    await chevron.click();
    await expect(expandableContent, 'Node should be expanded').toBeVisible();

    await checkbox.first().click();
    expect(await selectedAttribute(), 'Node should be selected').toEqual('true');
    expect(await checkboxIndeterminateAttribute(), 'Checkbox should not be in indeterminate state').toEqual('false');

    const firstNestedNode = selectors.getNode(page, getByTestId, 0, { parent: expandableContent });
    const secondNestedNode = selectors.getNode(page, getByTestId, 1, { parent: expandableContent });

    expect(await firstNestedNode.selectedAttribute(), 'First nested nodes should be selected').toEqual('true');
    expect(await secondNestedNode.selectedAttribute(), 'Second nested nodes should be selected').toEqual('true');

    await firstNestedNode.checkbox.click();
    expect(await firstNestedNode.selectedAttribute(), 'First nested node should not be selected').toEqual('false');
    expect(await selectedAttribute(), 'Node should not be selected after children deselect').toEqual('false');
    expect(await checkboxIndeterminateAttribute(), 'Node should be in indeterminate state').toEqual('true');

    await checkbox.first().click();
    expect(await checkboxIndeterminateAttribute(), 'Parent checkbox should not be in indeterminate state').toEqual(
      'false',
    );
    expect(await selectedAttribute(), 'Parent node should not be selected').toEqual('false');
    expect(await firstNestedNode.selectedAttribute(), 'First nested nodes should be not selected').toEqual('false');
    expect(await secondNestedNode.selectedAttribute(), 'Second nested nodes should be not selected').toEqual('false');
  });

  test('Disabled element works as expected', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
      },
    });
    const disabledElement = selectors.getNode(page, getByTestId, 'all', { disabled: true });

    await expect(disabledElement.node.first(), 'No disabled node found').toBeVisible();

    await disabledElement.chevron.first().click({ force: true });
    await expect(
      disabledElement.expandableContent.first(),
      'Should not expand after click on chevron',
    ).not.toBeVisible();

    await disabledElement.item.first().click({ force: true });
    expect(await disabledElement.selectedAttribute(), 'Should not select after click').not.toEqual('true');

    await page.keyboard.press(' ');
    expect(await disabledElement.selectedAttribute(), 'Should not select after press "space" key').not.toEqual('true');
    await expect(disabledElement.item.first(), 'Should be focused').toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(
      disabledElement.expandableContent.first(),
      'Should not expand after press "right" key',
    ).not.toBeVisible();
    await expect(
      disabledElement.nodeActionsButton.first(),
      'Node actions should be focused after press "right" key',
    ).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(disabledElement.nodeActionsOption.first(), 'Node actions should be available').toBeVisible();

    await page.keyboard.press('ArrowLeft');
    await expect(disabledElement.nodeActionsOption.first(), 'Noe actions should be closed').not.toBeVisible();
    await expect(
      disabledElement.nodeActionsButton.first(),
      'Node actions button should not be focused',
    ).not.toBeFocused();
    await expect(disabledElement.item.first(), 'Item should be focused').toBeFocused();

    await page.keyboard.press('Escape');
    await expect(disabledElement.item.first(), 'Item should not be focused after press "esc"').not.toBeFocused();
  });

  test('selectionMode=undefined is not selecting anything', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
        selectionMode: '!undefined',
      },
    });
    const firstElement = selectors.getNode(page, getByTestId, 0);

    await expect(firstElement.node, 'No nodes found').toBeVisible();
    await expect(firstElement.checkbox, 'Checkbox found in disabled selectionMode').not.toBeVisible();

    expect(await firstElement.selectedAttribute()).toEqual(null);

    await firstElement.item.click();

    expect(await firstElement.selectedAttribute()).toEqual(null);
  });

  test('Link is displayed and works correctly', async ({ page, gotoStory, waitForNavigation }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
      },
    });
    const getCurrentUrl = async () => {
      const url = await page.evaluate(() => window.location.pathname + window.location.search + window.location.hash);
      return url;
    };
    // Find link by test-id and href attribute (both are on the same element)
    const link = page.locator(`[data-test-id="${TEST_IDS.link}"][href="${LINK_TEST_HREF}"]`);
    // data-node-id and data-test-id are on the same element
    const linkNode = page.locator(`[data-test-id="${TEST_IDS.node}"][data-node-id="link"]`);
    const linkNodeItem = linkNode.locator(`[data-test-id="${TEST_IDS.item}"]`);

    await expect(link.first(), 'Link not found').toBeVisible();
    expect(await link.first().getAttribute('href')).toEqual(LINK_TEST_HREF);

    // Ensure the link is reachable via keyboard navigation
    await expect(linkNode, 'Link node not found').toBeVisible();
    await expect(linkNodeItem, 'Link node item not found').toBeVisible();
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await page.keyboard.press('Tab');

    for (let i = 0; i < 10; i += 1) {
      const isFocused = await linkNodeItem.evaluate(el => document.activeElement === el);
      if (isFocused) {
        break;
      }

      await page.keyboard.press('ArrowDown');
    }

    await expect(linkNodeItem, 'Link node should receive focus via keyboard navigation').toBeFocused();
    // Pressing Enter while the tree-item is focused should navigate to the href
    await page.keyboard.press('Enter');
    await waitForNavigation(LINK_TEST_HREF);
    expect(await getCurrentUrl(), 'Keyboard navigation to link href failed').toEqual(LINK_TEST_HREF);

    // Navigate back to the tree and ensure the link works when activated with a mouse click
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
      },
    });
    await expect(link.first(), 'Link not found after navigation back to the tree').toBeVisible();
    await link.first().click();
    await waitForNavigation(LINK_TEST_HREF);
    expect(await getCurrentUrl(), 'Mouse navigation to link href failed').toEqual(LINK_TEST_HREF);
  });

  test('Parent link with nested items expands, collapses, and navigates correctly', async ({
    page,
    gotoStory,
    waitForNavigation,
  }) => {
    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
      },
    });
    const getCurrentUrl = async () => {
      const url = await page.evaluate(() => window.location.pathname + window.location.search + window.location.hash);
      return url;
    };
    const treeItemSelector = `[data-test-id="${TEST_IDS.item}"]`;
    const focusTreeNodeItem = async (id: string, selector: string) => {
      await page.evaluate(
        ({ nodeId, sel }) => {
          const element = document.querySelector(`[data-node-id="${nodeId}"] ${sel}`) as HTMLElement | null;
          element?.focus();
        },
        { nodeId: id, sel: selector },
      );
    };

    const getParentNode = () => ({
      ...getTreeNodeById(page, 'nestedLink'),
      nestedChildNode: page.locator('[data-node-id="nested-link-1"]'),
    });

    const parent = getParentNode();

    await expect(parent.node, 'Parent node not found').toBeVisible();
    await expect(parent.expandableContent, 'Parent node should be collapsed by default').not.toBeVisible();

    await parent.chevron.click();
    await expect(parent.expandableContent, 'Parent node should be expanded after chevron click').toBeVisible();
    await expect(parent.nestedChildNode, 'Nested child should be visible after expansion').toBeVisible();

    await parent.chevron.click();
    await expect(parent.expandableContent, 'Parent node should collapse after second chevron click').not.toBeVisible();

    await expect(parent.link, 'Parent link should exist').toBeVisible();
    await parent.link.click();
    await waitForNavigation(LINK_TEST_HREF);
    expect(await getCurrentUrl(), 'Clicking parent node link should navigate to href').toEqual(LINK_TEST_HREF);

    await gotoStory({
      name: 'tree',
      props: {
        'data-test-id': TREE_TEST_ID,
      },
    });

    const parentAfterNavigation = getParentNode();

    await expect(parentAfterNavigation.item, 'Parent node should exist after navigation').toBeVisible();
    await focusTreeNodeItem('nestedLink', treeItemSelector);
    await expect(parentAfterNavigation.item, 'Parent node item should receive focus').toBeFocused();

    await page.keyboard.press('Enter');
    await waitForNavigation(LINK_TEST_HREF);
    expect(await getCurrentUrl(), 'Pressing Enter on parent node link should navigate to href').toEqual(LINK_TEST_HREF);
  });
});

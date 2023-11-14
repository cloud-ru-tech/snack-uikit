export const DEFAULT_PROPS = {
  title: 'Title truncate one line',
  description: 'Subtitle truncate two line',
  tip: 'Tooltip',
};

export const COLLAPSE_BLOCK_STORY_SETTINGS = {
  args: {
    id: '1',
    customHeader: false,
    title: DEFAULT_PROPS.title,
    description: DEFAULT_PROPS.description,
    name: 'Ivan Petrov',
    metadata: 'Engineer Cloud.ru',
    showTip: true,
    tip: DEFAULT_PROPS.tip,
    showActions: true,
    expanded: false,
  },

  argTypes: {
    id: {
      type: 'string',
    },
    customHeader: {
      name: '[Story]: Header instead CollapseBlockHeader',
    },
    title: {
      name: 'CollapseBlockHeader.title',
      if: {
        arg: 'customHeader',
        eq: false,
      },
    },
    description: {
      name: 'CollapseBlockHeader.description',
      if: {
        arg: 'customHeader',
        eq: false,
      },
    },
    name: {
      if: {
        arg: 'customHeader',
        eq: true,
      },
      name: '[Story]: field in custom Header',
    },
    metadata: {
      if: {
        arg: 'customHeader',
        eq: true,
      },
      name: '[Story]: field in custom Header',
    },
    showTip: {
      type: 'boolean',
      name: '[Story]: show tip in CollapseBlock',
    },
    showActions: {
      type: 'boolean',
      name: '[Story]: show actions in CollapseBlock',
    },
    actions: {
      if: {
        arg: 'showActions',
        eq: true,
      },
    },
    tip: {
      name: 'CollapseBlockHeader.tip (or tip in custom Header',
      type: 'string',
      defaultValue: DEFAULT_PROPS.tip,
      if: {
        arg: 'showTip',
        eq: true,
      },
    },
    expanded: {
      name: `[Story]: by default it controlled inside Accordion`,
      type: 'boolean',
    },
  },
};

export const STORY_TEST_IDS = ['collapseBlockFirst', 'collapseBlockSecond'];

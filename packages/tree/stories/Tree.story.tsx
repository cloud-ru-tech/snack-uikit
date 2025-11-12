import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { EyeClosedSVG, EyeSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tree, TreeNodeProps, TreeProps } from '../src';
import { LINK_TEST_HREF, SELECTION_MODE } from '../src/constants';
import { TreeNodeId } from '../src/types';
import { getNested, getNodeActions } from './helpers';
import picture from './ImageProdContentLittle.jpg';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Tree',
  component: Tree,
};
export default meta;

const TREE_DATA: TreeNodeProps[] = [
  {
    id: '1',
    title: 'item with custom icon',
    nested: [],
    expandedIcon: <EyeSVG />,
    collapsedIcon: <EyeClosedSVG />,
  },
  {
    id: '2',
    title: 'item 2',
    nested: [],
  },
  {
    id: 'syncOpen',
    title: 'main 3',
    className: 'test',
    nested: [
      {
        id: '3.1',
        title: () => <img src={picture} alt='custom-content' className={styles.image} />,
        nested: [
          { id: '3.1-1', title: () => <img src={picture} alt='custom-content' className={styles.image} /> },
          { id: '3.1-2', title: 'first-second' },
        ],
      },
      {
        id: '3.2',
        title: '3.2',
        nested: [
          { id: '3.2-1.1', title: 'first-first' },
          { id: '3.2-1.2', title: 'first-second' },
        ],
      },
      {
        id: '3-disabled',
        title: 'item disabled',
        disabled: true,
      },
      {
        id: '3.3',
        title: () => <img src={picture} alt='custom-content' className={styles.image} />,
      },
    ],
  },
  {
    id: 'empty',
    title: 'empty after load',
    nested: [],
  },
  {
    id: '0-disabled',
    title: 'folder disabled',
    disabled: true,
    nested: [],
  },
  {
    id: 'link',
    title: 'link to url',
    href: LINK_TEST_HREF,
  },
  {
    id: 'nestedLink',
    title: 'nested link to url',
    nested: [
      {
        id: 'nested-link-1',
        title: 'link to url',
        href: LINK_TEST_HREF,
      },
    ],
    href: LINK_TEST_HREF,
  },
  {
    id: 'linkOnClick',
    title: 'link with onClick prevent redirect',
    onClick: () => console.warn('onClick'),
    href: '/test',
  },
  {
    id: 'justItem',
    title: 'file',
  },
  {
    id: 'custom-content',
    title: 'item with custom content',
    nested: [
      {
        id: 'custom-content-1',
        title: () => <img src={picture} alt='custom-content' className={styles.image} />,
      },
    ],
  },
];

type StoryProps = TreeProps & { enableNodeActions: boolean };

const Template: StoryFn<StoryProps> = ({ selectionMode, enableNodeActions, ...props }: StoryProps) => {
  const [selectedNodes, setSelected] = useState<TreeNodeId | TreeNodeId[]>();
  const [data, setData] = useState(TREE_DATA);

  useEffect(() => {
    setSelected(undefined);
  }, [selectionMode]);

  const updateTreeData = (list: TreeNodeProps[], id: string, nested: TreeNodeProps[]) => {
    if (id === 'empty') return list;

    return list.map(node => {
      if (node.id === id) {
        node.nested = nested;
      }

      return node;
    });
  };

  const onDataLoad = (node: TreeNodeProps) =>
    new Promise(resolve => {
      if (node.nested?.length) {
        resolve(true);
        return;
      }

      setTimeout(() => {
        setData(prevValue => updateTreeData(prevValue, node.id, getNested(node.id)));
        resolve(true);
      }, 1000);
    });

  const commonProps = {
    ...props,
    onSelect: undefined,
    selected: undefined,
    data,
    ...(enableNodeActions ? { nodeActions: getNodeActions(), parentActions: getNodeActions(true) } : {}),
    onDataLoad,
  };

  const selectableProps = {
    ...commonProps,
    selected: selectedNodes,
    onSelect: setSelected,
  };

  const switchRender = () => {
    switch (selectionMode) {
      case SELECTION_MODE.Single:
        return <Tree {...selectableProps} selectionMode={selectionMode} selected={selectedNodes as TreeNodeId} />;
      case SELECTION_MODE.Multi:
        return <Tree {...selectableProps} selectionMode={selectionMode} selected={selectedNodes as TreeNodeId[]} />;
      case undefined:
      default:
        return <Tree {...commonProps} />;
    }
  };

  return <div className={styles.storyWrap}>{switchRender()}</div>;
};

export const tree = {
  render: Template,

  args: {
    enableNodeActions: true,
    selectionMode: SELECTION_MODE.Single,
  },

  argTypes: {
    selectionMode: {
      options: [undefined, ...Object.values(SELECTION_MODE)],
      control: {
        type: 'select',
      },
    },
    enableNodeActions: {
      name: '[Stories]: Enable node actions',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A34043&mode=design',
    },
  },
};

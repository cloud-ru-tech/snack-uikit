# Tree

## Installation
`npm i @snack-uikit/tree`

[Changelog](./CHANGELOG.md)

## Example

#### selectionMode = 'single'

```typescript jsx
import { Tree } from '@snack-uikit/tree';

// ...

const [selectedNode, setSelected] = useState<TreeNodeId>();

// ...

<Tree data={data} selectionMode='single' selected={selectedNode} onSelect={setSelected} />
```

#### selectionMode = 'multi'

```typescript jsx
import { Tree } from '@snack-uikit/tree';

// ...

const [selectedNodes, setSelected] = useState<TreeNodeId[]>([]);

// ...

<Tree data={data} selectionMode='multi' selected={selectedNodes} onSelect={setSelected} />
```


[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## Tree
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| data* | `TreeNodeProps[]` | - | Данные для отрисовки |
| selectionMode | "single" \| "multi" | - | Режим выбора элементов: <br> - `Single` - одиночный выбор <br> - `Multi` - множественный выбор |
| onNodeClick | `OnNodeClick` | - | Обработчик клика по элементу дерева |
| expandedNodes | `string[]` | - | Состояние для раскрытых элементов |
| onExpand | `(expandedKeys: string[], nodeId: string) => void` | - | Колбэк при раскрытии/закрытии элементов |
| onDataLoad | `(node: TreeNodeProps) => Promise<unknown>` | - | Колбэк для асинхронной загрузки данных при раскрытии дерева |
| parentActions | `(node: TreeNodeProps) => DroplistItemSingleProps[]` | - | Дополнительные действия для элемента-родителя |
| nodeActions | `(node: TreeNodeProps) => DroplistItemSingleProps[]` | - | Дополнительные действия для элемента-потомка |
| showLines | `boolean` | true | Флаг отвечающий за отображение линий вложенности |
| className | `string` | - | CSS-класс |
| selected | `string \| string[]` | - | Состояние для выбраных элементов: <br> - При <strong>selectionMode</strong>=`Multi` - принимает массив строк <br> - При <strong>selectionMode</strong>=`Single` - принимает строку |
| onSelect | `((selectedKeys: string[], node: TreeNodeProps) => void) \| ((selectedKey: string, node: TreeNodeProps) => void)` | - | Колбэк при изменении выбраных элементов: <br> - При <strong>selectionMode</strong>=`Multi` - возвращает массив строк <br> - При <strong>selectionMode</strong>=`Single` - возвращает строку |


[//]: DOCUMENTATION_SECTION_END

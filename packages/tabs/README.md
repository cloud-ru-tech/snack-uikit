# TabBar

## Installation
`npm i @snack-ui/tabs`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
const [selectedTab, setSelectedTab] = useState('tab1');

<Tabs selectedTab={selectedTab} onChange={setSelectedTab}>
  <Tabs.TabBar>
    <Tabs.Tab label='Tab 1' id='tab1' counter={12} />
    <Tabs.Tab label='Tab 2' id='tab2' />
    <Tabs.Tab label='Tab Disabled' id='tab3' disabled />
  </Tabs.TabBar>
  <Tabs.TabContent className={styles.tab} value='tab1'>
    Content of tab1
  </Tabs.TabContent>
  <Tabs.TabContent className={styles.tab} value='tab2'>
    Content of tab2
  </Tabs.TabContent>
  <Tabs.TabContent className={styles.tab} value='tab3'>
    Content of tab3
  </Tabs.TabContent>
</Tabs>
```



## Tabs
Компонент-обертка для группы вкладок.

### Props

#### **`selectedTab?: string`**
Управляет состоянием выбранной вкладки, сюда нужно передать её id.

#### **`defaultSelectedTab?: string`**
Вкладка, выбранная по умолчанию.

#### **`onChange?: (id: string) => void`**
Колбек, который срабатывает на изменение выбранной вкладки.

#### **`children?: ReactNode`**
Контент компонента.



## Tabs.TabBar
Компонент, содержащий кнопки навигации по вкладкам.

### Props

#### **`type?: Type`** - *`[Primary]`*
Тип вкладок - первого (`Primary`) или второго (`Secondary`) уровня.

#### **`className?: string`**
CSS-класс на контейнере.

#### **`children?: ReactElement<TabProps>[];`**
Набор кнопок-переключателей для вкладок.



## Tabs.Tab
Кнопка переключения вкладки.

### Props

#### **`id: string`**
id вкладки.

#### **`label: string`**
Заголовок вкладки.

#### **`disabled?: boolean`** - *`[false]`*
Деактивирована ли вкладка.

#### **`className?: string`**
CSS-класс на контейнере.

#### **`counter?: number`**
Счетчик, отображающийся внутри кнопки переключения.

#### **`onClick?: (event: MouseEvent<HTMLButtonElement>) => void`**
Колбэк клика по кнопке переключения.



## Tabs.TabContent
Компонент для отображения содержимого вкладки.

### Props

#### **`value: string`**
id вкладки.

#### **`className?: string`**
CSS-класс на контейнере.

#### **`children?: ReactNode`**
Содержимое вкладки.

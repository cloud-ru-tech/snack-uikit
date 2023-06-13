# TabBar

## Installation
`npm i @snack-ui/tabs`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
const [value, setValue] = useState('tab1');

<Tabs value={value} onChange={setValue}>
  <Tabs.TabBar>
    <Tabs.Tab label='Tab 1' value='tab1' counter={12} />
    <Tabs.Tab label='Tab 2' value='tab2' />
    <Tabs.Tab label='Tab Disabled' value='tab3' disabled />
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

#### **`value?: string`**
Управляет состоянием выбранной вкладки, сюда нужно передать её value.

#### **`defaultValue?: string`**
Вкладка, выбранная по умолчанию.

#### **`onChange?: (value: string) => void`**
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

#### **`value: string`**
value вкладки.

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
value вкладки.

#### **`className?: string`**
CSS-класс на контейнере.

#### **`children?: ReactNode`**
Содержимое вкладки.

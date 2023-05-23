# Popover Private

## Installation
`npm i @snack-ui/popover-private`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
import { PopoverPrivate } from "@snack-ui/pagination";

function App() {
  return (
    <PopoverPrivate
        placement={PopoverPrivate.placements.Top}
        popoverContent='Не нажимать, опасно!'
        trigger={PopoverPrivate.triggers.Click}
      >
        <button>Button with popover</button>
    </PopoverPrivate>
  );
}
```

## Props

#### **`open?: boolean`** - *`[undefined]`*
  управляет состоянием показан/не показан.

#### **`onOpenChange?: (isOpen: boolean) => void`** - *`[undefined]`*
  колбек отображения компонента. Срабатывает при изменении состояния open.

#### **`placement?: Placement`** - *`[Top]`*
  положение поповера относительно своего таргета (children).
  Возможные значения: `Left, LeftStart, LeftEnd, Right, RightStart, RightEnd, Top, TopStart, TopEnd, Bottom, BottomStart, BottomEnd`

#### **`hasArrow?: boolean`** - *`[undefined]`*
  параметр наличия стрелки у поповера. В размеры стрелки встроен отступ. Дополнительный отступ может быть задан параметром `offset`. У элемента стрелки нет цвета, необходимо задавать его через параметр `arrowClassName`.

#### **`arrowSize?: ArrowSize`** - *`[m]`*
  параметр управляет габаритами контейнера стрелки. Возможные значения: `s, m, l`.

#### **`popoverContent: ReactNode`**
  содержимое поповера.

#### **`children: ReactNode | ChildrenFunction`**
  Референс, относительно которого рисуется поповер. Возможно несколько вариантов:
 - в **`children`** передан компонент, который принимает в себя `ref`. В таком случае пропсы этого компонента будут дополнены необходимыми для работы триггеров отображения: `useHoverTrigger`, `useClickTrigger`, `useFocusTrigger`. 
    
    > Осторожно, `ref` будет перезаписан. Если вы хотите получить ref на children поповера, можете передать ref в параметр triggerRef. Тогда поповер установит туда значение:
    ```typescript jsx
      <PopoverPrivate
        popoverContent={<div className={style.content}>some tip here</div>}
        useHoverTrigger
        triggerRef={(button) => { /* button HTMLElement из children */ }}
      >
        <button>some button<button>
      </PopoverPrivate>
    ```

  - в **`children`** передан компонент, который **НЕ** принимает в себя `ref`. В таком случае компонент будет обернут в `span`, который и послужит рефом для поповера.

  - в **`children`** передана функция. Эта функция будет вызвана на каждый рендер, она должна возвращать `ReactNode`. В параметры принимает ref, который нужно установить в целевой компонент и функцию `getReferenceProps`, возвращающую необходимые для ref параметры.
  Пример:
    ```typescript jsx
      <PopoverPrivate
        popoverContent={<div className={style.content}>some tip here</div>}
        useHoverTrigger
      >
        {({ getReferenceProps, ref }) => (
          <label>
            Set the value
            <input ref={ref} {...getReferenceProps({ onClick: onClickInputHandler })} />
          </label>
        )}
      </PopoverPrivate>
    ```

  - в **`children`** передан примитив string, number или React.Fragment. Children будет обернут в `span`.

#### **`trigger: Trigger`**
  триггер открытия/закрытия поповера.
  - `Click` - открывать по клику
  - `Hover` - открывать по ховеру
  - `FocusVisible` - открывать по focus-visible
  - `Focus` - открывать по фокусу
  - `HoverAndFocusVisible` - открывать по ховеру и focus-visible
  - `HoverAndFocus` - открывать по ховеру и фокусу
  - `ClickAndFocusVisible` - открывать по клику и focus-visible

#### **`hoverDelayOpen?: number`**
  задержка отображения при ховере в мс

#### **`hoverDelayClose?: number`**
  задержка закрытия при ховере в мс

#### **`widthStrategy?: PopoverWidthStrategy`**
  стратегия управления шириной контейнера поповера
  - `Auto` - соответствует ширине контента,
  - `Gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
  - `Eq` - Equal, строго равен ширине таргета.

#### **`className?: string`**
  CSS-класс на контейнере поповера.

#### **`offset?: number`**
  Отступ поповера от его target-элемента (в пикселях).

# Skeleton

## Installation
`npm i @snack-ui/skeleton`

[Changelog](./CHANGELOG.md)

## Skeleton
Компонент скелетона блока.

### Props

#### **`loading?: boolean`**
  Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children.

#### **`width?: string | number`**
  Ширина блока. Можно указать значение допустимое для CSSProperty.width (пример `'60%'`, `'400px'` и т.д)

#### **`height?: string | number`** - *`['1em']`*
  Высота блока. Можно указать значение допустимое для CSSProperty.height (пример `'60%'`, `'400px'` и т.д)

#### **`borderRadius?: string | number`**
  Радиус скругления. Можно указать значение допустимое для CSSProperty.borderRadius (пример `'10px'`, `'50%'` и т.д)

## SkeletonText
Компонент скелетона текста.
### Props

#### **`loading?: boolean`**
  Флаг состояния загрузки. Если значение true, будет отрисован блок скелетона, если false - children.

#### **`lines?: number `** - *`[3]`*
  Количество строк.

#### **`borderRadius?: string | number`** - *`['0.4em']`*
  Радиус скругления одной строки. По-умолчанию половина от высоты строки.



## SkeletonContextProvider

Для централизованного управления состоянием загрузки можно использовать `SkeletonContextProvider`. Находящиеся внутри этого контекста компоненты Skeleton и SkeletonText не требуют активации через проп `loading` а берут его из контекста.

## WithSkeleton
Для группировки блоков скелетона используется компонент `WithSkeleton`. В проп `skeleton` он принимает ноду скелетона, а в `children` то, что он заменяет. Компонент также забирает пропсу `loading` из контекста.

```typescript jsx
<SkeletonContextProvider loading={isLoading}>
  <WithSkeleton skeleton={<CardSkeleton />}>
    <Card />
  </WithSkeleton>
</SkeletonContextProvider>
```


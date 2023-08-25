# Typography

## Installation
`npm i @snack-ui/typography`

## Example

```typescript jsx
import {Typography} from "@snack-ui/typography";

<Typography 
  family={Typography.families.Sans}
  role={Typography.roles.Display}
  size={Typography.sizes.S}
  tag={Typography.tags.h1}
  className='some-element'
>
  Some text
</Typography>
```

Также чтобы не указывать пропсы family, role и size, воспользуйтесь таким вариантом:
```typescript jsx
<Typography.SansDisplayS tag={Typography.tags.h1} className='some-element'>
  Some text
</Typography.SansDisplayS>
```

Все компоненты вида ```<Typography.{Family}{Role}{Size} /> ``` автогенерятся

## Как добавить новый компонент такого вида?
1. Добавить новое свойство в один или несколько объектов Family, Role, Size в файле `constants.ts`, который лежит в  `typography/src/components/constants.ts`
2. Запустить скрипт compile в package.json пакета `@typography`
    ```json
    "npm run build:typography-components && npm run build:constants && npm run build:index"
    ```
3. Готово! Можете использовать `Typography` с новым свойством

## Props

```typescript jsx
enum Family {
  Sans = 'sans',
  Light = 'light',
  Link = 'link',
  Mono = 'mono',
  CrossedOut = 'crossed-out',
}

enum Role {
  Display = 'display',
  Headline = 'headline',
  Title = 'title',
  Label = 'label',
  Body = 'body',
}

enum Size {
  L = 'l',
  M = 'm',
  S = 's',
}

enum Tag {
  span = 'span',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  div = 'div',
  label = 'label',
  p = 'p',
}

type TypographyProps = WithSupportProps<{
  tag?: Tag;
  className?: string;
  children?: ReactNode;
  family: Family;
  role: Role;
  size: Size;
}>;
```

[Changelog](./CHANGELOG.md)



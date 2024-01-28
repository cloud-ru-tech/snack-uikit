# Icons

## Installation
`npm i @snack-uikit/icons`

## Как подключить иконки в проект

1. Подключите `svg-inline-loader` в конфигурацию webpack-a:

```typescript
import { SVG_SPRITE_WEBPACK_REG_EXP } from '@snack-uikit/icons';

export default {
  module: {
    rules: [
      { 
        test: /\.symbol.svg$/, 
        use: 'svg-inline-loader' 
      },
    ],
  }, 
  ...
};
```

2. Подключите спрайт с иконками в проект

```typescript jsx
import { Sprite, SpriteSVG } from '@snack-uikit/icons';

function App () {
  return (
    <>
       <Sprite content={SpriteSVG} />
    </>
  );
}
```

3. Используйте иконки как обычные реакт-компоненты:

```typescript jsx
import { ChevronLeftSVG }  from '@snack-uikit/icons';

function MyComponent ()  {
  return <div><ChevronLeftSVG /></div>
}
```

## Как добавить новую иконку

1. Добавьте новый svg-файл в соответсвующую коллекцию иконок в папке svgs (это может быть новый размер иконки). Далее все нужные файлы сгенерятся автоматически во время релиза пакета. 
2. Если такой коллекции еще нет, создайте новую (**new-collection** - имя новой коллекции):
   * создайте папку **new-collection** внутри svgs
   * добавьте svg-файлы с названиями **new-collections-s/xs** (где s/xs размер иконки, 16 или 24)
   * добавьте скрипт в package.json:
   ```json
   "build:new-collection": "npm run fix:icons --directory=new-collection && npm run build:icons --directory=new-collection",
   ```
   * обновите скрипт **compile** в package.json:   
   ```json
   "compile": "... && npm run build:new-collection"
   ```
3. Чтобы новая иконка появилась локально, запустите скрипт `build:packages` в корневом `package.json`

## Examples

```typescript jsx
import { ChevronLeftSVG }  from '@snack-uikit/icons';

<ChevronLeftSVG size={24}/>
```

## Props

```typescript jsx
interface ISvgIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: string | number;
  style?: React.CSSProperties;
}
```



[Changelog](./CHANGELOG.md)



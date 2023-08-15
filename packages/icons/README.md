# Icons

## Installation
`npm i @snack-ui/icons`

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
import { ChevronLeftSVG }  from '@snack-ui/icons';

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



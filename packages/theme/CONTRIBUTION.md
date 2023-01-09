# Styling

## Создание новой темы

1. Копируем существующую тему в папке `theme` (например `purple.ts`).
2. Изменяем название файла. По данному названию будет происходить import темы.
3. Переопределяем необходимые цвета

## Добавление нового цвета

1. Создаем новую css-переменную в файле: `./theme/color/vars`
   Правила наименование экспортируемой переменной
   : `COLORS_${componentName}`
   Например: `COLORS_BUTTON`

   Правила наименования свойств `COLORS_${componentName}`:
   : `${определяющий признак 1}_${определяющий признак 2}_${css-свойство(например, color)}`
   Например: `TRANSPARENT_ACTIVE_COLOR`

   Правила наименовани css-переменной
   : `--${перечесление через "-" предыдущих параметров }`
   Например: `--button-transperent-active-color`

   Полный пример

   ```
   export const COLORS_BUTTON = {
       TRANSPARENT_ACTIVE_COLOR: `--button-transperent-active-color`
   }
   ```

2. Определяем ее в необходимой теме

Например
: `${COLORS_BUTTON.TRANSPARENT_COLOR}: var(${COLORS.VIOLET_3});`

# Snack UIKit [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

### [Библиотека React-компонентов](https://cloud-ru-tech.github.io/snack-uikit) от компании [Cloud.ru](https://cloud.ru/) и сообщества [TeamSnack](https://t.me/+tN0DDzHaDVc3M2Iy).
- [Домашняя страница Snack UIKit](https://snack-uikit.com)
- [Проект на GitHub](https://cloud-ru-tech.github.io/snack-uikit)
- [Проект в Figma](https://www.figma.com/@TeamSnack)
- [Телеграм-канал сообщества TeamSnack](https://t.me/+tN0DDzHaDVc3M2Iy)
- [Contribution Guide](CONTRIBUTING.md)

## Почему Snack UIKit

- **Контрибьюторы**: Snack UIKit - это стандартный инструмент разработки интерфейсов в компании [cloud.ru](https://cloud.ru). С его помощью решаются самые широкие задачи: seo-ориентированный портал, админки любой сложности и внутренние инструменты. ![Cloud](storybook/assets/CloudRuFullLogo.svg)

- **Кастомизация**: Библиотека компонентов имеет интеграцию с figma и стилизуется набором токенов, которые могут быть переопределены. Вы можете настроить тему под свои нужды.

- **Dark/Light**: Поддержка темной и светлой модификации "из коробки".

- **Модульная публикация**: Компоненты поставляются в формате отдельных npm-пакетов. Вы можете обновлять только то, что необходимо в данный момент, не беспокоясь за остальные части вашего проекта.

- **E2E тестирование**: Компоненты проходят автоматические тесты в chrome и firefox ![Chrome](storybook/assets/GoogleChromeLogo.svg) ![Firefox](storybook/assets/FirefoxLogo.svg)

- **Совместимость со всеми браузерами**: ![Chrome](storybook/assets/GoogleChromeLogo.svg) ![Firefox](storybook/assets/FirefoxLogo.svg) ![Edge](storybook/assets/EdgeLogo.svg) ![Safari](storybook/assets/SafariBrowserLogo.svg)

## Начать использовать Snack UIKit
### Создание приложения
Вы можете использовать [шаблон приложения](https://github.com/cloud-ru-tech/snack-uikit-template), в котором уже подключен Snack UIKit и настроена сборка.

### Управление стилями
Стилизация приложения на Snack UIKit основана на использовании классов `light` и `dark` из файла `@snack-uikit/figma-tokens/build/css/brand.module.css`. Классы содержат css-переменные со стилями для светлой и темной модификаций интерфейса соответственно.
> Не используйте эти css-переменные напрямую. Как использовать токены темы читайте в [описании пакета темы](https://github.com/cloud-ru-tech/figma-tokens?tab=readme-ov-file#как-использовать-токены-в-приложении).

Для того чтоб подключить стили Snack UIKit в приложение, вам нужно:
* Импортировать хук `useThemeConfig`
* В хук передать мапу с ключами тем и соответсвующими стилевыми файлами
* Из хука получить класс для темы, который нужно задать обёртке на верхнем уровне приложения.
  * Менять тему можно с помощью функции `changeTheme`, возвращаемой из хука. Можно также положить её в контекст и передать вниз по реакт-дереву.

```typescript jsx
import { createContext, useEffect } from 'react';
import { useThemeConfig } from '@snack-uikit/utils';
import { ButtonFilled } from '@snack-uikit/button';
import DefaultBrand from '@snack-uikit/figma-tokens/build/css/brand.module.css';

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

const themeMap = {
  [Theme.Light]: DefaultBrand.light,
  [Theme.Dark]: DefaultBrand.dark,
};

type ThemeContextProps = {
  theme: Theme;
  changeTheme(value: Theme): void;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.Light,
  changeTheme() {}
});

function App() {
  const { theme, themeClassName, changeTheme } = useThemeConfig<Theme>({themeMap, defaultTheme: Theme.Light});
  
  // также можно повесить класс на body
  // useEffect(() => {
  //   document.body.classList.add(themeClassName);
  //   return () => document.body.classList.remove(themeClassName);
  // }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={themeClassName}>
        <ButtonFilled label='OK'/>
      </div>
    </ThemeContext.Provider>
  );
}
```

## Команда

`Development Team` - Трифонов Михаил, Ахременко Григорий, Белов Алексей, Ершов Никита, Козлова Анна, Хлупин Сергей, Белявский Илья

`Design Team` - Малокостов Игорь, Алексеев Алексей


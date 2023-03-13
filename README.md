# Snack Uikit [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![coverage](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/badges/master/coverage.svg?job=testcafe-coverage&key_text=coverage&&key_width=100/coverage.svg)](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/badges/master/coverage.svg?job=testcafe-coverage&key_text=coverage&&key_width=100)

Snack Uikit - библиотека компонентов компании Cloud, в которой каждый компонент это отдельный npm-пакет, со своей версионностью и зависимостями.

# Example

# Design

[Figma](https://www.figma.com/files/1101513230643708615/team/1194627249980298820/DS-(FF))

# Browser support

![Chrome](./packages/icons/svgs/color/logos/GoogleChromeLogo.svg)
![Firefox](./packages/icons/svgs/color/logos/FirefoxLogo.svg)
![Chromium](./packages/icons/svgs/color/logos/ChromiumLogo.svg)
![Safari](./packages/icons/svgs/color/logos/SafariBrowserLogo.svg)

# Automation testing

![Chrome](./packages/icons/svgs/color/logos/GoogleChromeLogo.svg)
![Firefox](./packages/icons/svgs/color/logos/FirefoxLogo.svg)

# Installation

1. Получить доступ к [snack-uikit](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit)
2. Создать `.npmrc` в корневой директории. Содержание `.npmrc`:
```
@snack-ui:registry=https://pkg.sbercloud.tech/artifactory/api/npm/sc-uikit-npm/
```
3. Обновить версию [@sbercloud/ft-config-webpack-spa](https://git.sbercloud.tech/sbercloud-ui/business-tools/frontend-tools/-/tree/master/packages/config-webpack-spa) минимум до 0.6.0
4. Установить необходимый пакет, например `npm i @snack-ui/button`.

# Styling

* Импортируем хук `useThemeConfig`
* В хук передаем мапу с темами и соответсвующими стилевыми файлами
* Из хука получаем класс для темы, который можно задать обёртке на верхнем уровне приложения.
  * Менять тему можно с помощью функции `changeTheme`, возвращаемой из хука. Можно также положить её в контекст и передать вниз по реакт-дереву.

```typescript jsx
import { useThemeConfig } from '@snack-ui/utils';
import DefaultBrand from '@sbercloud/figma-tokens/build/css/brand.module.css';

export enum Theme {
  Dark = 'Dark',
  Light = 'Light',
}

const themeMap = {
  [Theme.Dark]: DefaultBrand.light,
  [Theme.Light]: DefaultBrand.dark,
};

function App() {
  const { theme, themeClassName, changeTheme } = useThemeConfig({themeMap, defaultTheme: Theme.Light});
  
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={themeClassName}>{...}</div>
    </ThemeContext.Provider>
  );
}
```

# Contribution

[Contribution Guide](CONTRIBUTING.md)

# Team

`Development Team` - Трифонов Михаил, Ахременко Григорий, Безматерных Дмитрий, Белов Алексей, Ершов Никита, Козлова Анна, Круглов Дмитрий, Хлупин Сергей 

`Design Team` - Малокостов Игорь
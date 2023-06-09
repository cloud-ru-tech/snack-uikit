# Snack Uikit [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![coverage](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/badges/master/coverage.svg?job=testcafe-coverage&key_text=coverage&&key_width=100/coverage.svg)](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/badges/master/coverage.svg?job=testcafe-coverage&key_text=coverage&&key_width=100)

Snack Uikit - [библиотека компонентов](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit) компании [Cloud](https://sbercloud.ru/) и сообщетсва [TeamSnack](https://t.me/+tN0DDzHaDVc3M2Iy), в которой каждый компонент это отдельный npm-пакет, со своей версионностью и зависимостями.

![Cloud](storybook/assets/CloudRuFullLogo.svg)   

![TeamSnack](storybook/assets/TeamSnack.jpg)

# Design

[Figma](https://www.figma.com/files/1101513230643708615/team/1194627249980298820/DS-(FF))

# Browser support

![Chrome](storybook/assets/GoogleChromeLogo.svg)
![Firefox](storybook/assets/FirefoxLogo.svg)
![Chromium](storybook/assets/ChromiumLogo.svg)
![Safari](storybook/assets/SafariBrowserLogo.svg)

# Automation testing

![Chrome](storybook/assets/GoogleChromeLogo.svg)
![Firefox](storybook/assets/FirefoxLogo.svg)

# Installation

1. Получить доступ к [snack-uikit](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit)
2. Создать `.npmrc` в корневой директории. Содержание `.npmrc`:
```text
@snack-ui:registry=https://pkg.sbercloud.tech/artifactory/api/npm/sc-uikit-npm/
```
3. Обновить версию [@sbercloud/ft-config-webpack-spa](https://git.sbercloud.tech/sbercloud-ui/business-tools/frontend-tools/-/tree/master/packages/config-webpack-spa) минимум до 0.6.0
4. Установить необходимый пакет, например:
```text
npm i --save-dev @snack-ui/button
```


# Usage

* Импортировать хук `useThemeConfig`
* В хук передать мапу с ключами тем и соответсвующими стилевыми файлами
* Из хука получить класс для темы, который нужно задать обёртке на верхнем уровне приложения.
  * Менять тему можно с помощью функции `changeTheme`, возвращаемой из хука. Можно также положить её в контекст и передать вниз по реакт-дереву.

```typescript jsx
import { createContext, useEffect } from 'react';
import { useThemeConfig } from '@snack-ui/utils';
import { ButtonFilled } from '@snack-ui/button';
import DefaultBrand from '@sbercloud/figma-tokens/build/css/brand.module.css';

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
  const { theme, themeClassName, changeTheme } = useThemeConfig({themeMap, defaultTheme: Theme.Light});
  
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

# Team

`Development Team` - Трифонов Михаил, Ахременко Григорий, Безматерных Дмитрий, Белов Алексей, Ершов Никита, Козлова Анна, Круглов Дмитрий, Хлупин Сергей 

`Design Team` - Малокостов Игорь

# Contribution

[Contribution Guide](CONTRIBUTING.md)

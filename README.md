# Snack Uikit [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Snack Uikit - [библиотека компонентов](https://cloud-ru-tech.github.io/snack-uikit) компании [Cloud.ru](https://cloud.ru/) и сообщества [TeamSnack](https://t.me/+tN0DDzHaDVc3M2Iy), в которой каждый компонент это отдельный npm-пакет, со своей версионностью и зависимостями.

![Cloud](storybook/assets/CloudRuFullLogo.svg)   

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
```text
npm i --save @snack-uikit/button
```

# Usage

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

# Team

`Development Team` - Трифонов Михаил, Ахременко Григорий, Белов Алексей, Ершов Никита, Козлова Анна, Хлупин Сергей, Белявский Илья

`Design Team` - Малокостов Игорь, Алексеев Алексей

# Contribution

[Contribution Guide](CONTRIBUTING.md)

# Sbercloud uikit [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![coverage](https://git.sbercloud.tech/sbercloud-ui/uikit-product/badges/master/coverage.svg?job=test-coverage&key_text=coverage&&key_width=100/coverage.svg)](https://git.sbercloud.tech/sbercloud-ui/uikit-product/badges/master/coverage.svg?job=test-coverage&key_text=coverage&&key_width=100)

Sbercloud uikit - библиотека компонентов, в которой каждый компонент это отдельный npm-пакет, со своей версионностью и зависимостями.

# Example

[Storybook [Latest master].](https://uikit.sbercloud.tech/)

[Storybook [Poc stand].](http://192.168.67.22:32333/)

# Design

[Figma](https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System)

[Notion](https://scpds.notion.site/aa332f333c3b41a5866c46b5d2bdb0c6)

# Browser support

![Chrome](./packages/icons/svgs/color/logos/GoogleChromeLogo.svg)
![Firefox](./packages/icons/svgs/color/logos/FirefoxLogo.svg)
![Chromium](./packages/icons/svgs/color/logos/ChromiumLogo.svg)
![Safari](./packages/icons/svgs/color/logos/SafariBrowserLogo.svg)

# Automation testing

![Chrome](./packages/icons/svgs/color/logos/GoogleChromeLogo.svg)
![Firefox](./packages/icons/svgs/color/logos/FirefoxLogo.svg)

# Installation

1. Получить доступ к @sbercloud/uikit-product
2. Создать `.npmrc` в корневой директории
   содержание `.npmrc`:
   `@sbercloud:registry=https://pkg.sbercloud.tech/artifactory/api/npm/sc-uikit-npm/`
3. При использовании `linaria` Добавить в `linaria.config.js` секцию:

```ts
import path from 'path';

import shaker from '@linaria/shaker';

function escapeRegex(string: string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const sep = escapeRegex(path.sep);

const pathRegExp = new RegExp(`@sbercloud${sep}uikit.+${sep}dist${sep}esm`);

export const defaultLinariaConfig = (uniqueString: string): Record<string, unknown> => ({
  evaluate: true,
  displayName: true,
  classNameSlug: (hash: string, title: string) => `${title}-${uniqueString}-${hash}`,
  rules: [
    {
      action: shaker,
    },
    {
      test: (filePath: string): boolean => !Boolean(pathRegExp.test(filePath)) && /node_modules/.test(filePath),
      action: 'ignore',
    },
  ],
});
```

4. Установить необходимый пакет, например `npm i @sbercloud/uikit-product-button`.

# Styling:

## Import style:

1. Импортируем ConfigProvider:
   `import { ConfigProvider } from "@sbercloud/uikit-product-utils";`
2. Оборачиваем проект, theme передаем тему по умолчанию:
   `<ConfigProvider theme={ConfigProvider.themes.Purple}>...</ConfigProvider>`

## Change theme

1. Импортируем hook useTheme:
   `import { useTheme } from "@sbercloud/uikit-product-utils";`

2. Используем callback для смены темы:

```js
const { changeTheme, Themes } = useTheme();
changeTheme(Themes.Purple);
```

# Contribution

[Contribution Guide](CONTRIBUTING.md)

# Changelog

Change log разбит по пакетам.
Вы можете посмотреть changelog либо в [Storybook](https://uikit.sbercloud.tech/) или в `package` необходимого пакета

# Questions

Появились вопросы?
Возможно ответ на ваши вопросы содержится в [Contribution Guide](CONTRIBUTING.md) или в [Issue](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/boards/15?milestone_title=Idea)

В противном случаи можно создать [новый issue](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/issues/new)

# Issue board

[Backlog](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/boards/15?milestone_title=Idea) - Борда поступивших заявок

[Idea board](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/boards/51?milestone_title=None) - Борда для работы с идеями

[Component status map](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/boards/52?milestone_title=Design) - Актуальный статус компонентов

# Issue Processes

1. Создан [новый issue](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/issues/new)
2. Issue рассмотрен на грумминге
   > Участники грумминга: Core team + Review team
   >
   > Частота грумминга: каждый вторник в 14:00.
   >
   > Если необходимо записаться на грумминг напишите любому члену Core Team

```
Если есть необходимость, всегда можно организовать внеочередной грумминг
```

3. После того как Issue пройдет этапы `Grooming` и in `Design`, попадает в `Ready for development` и готово к разработки. Может быть взято любой из команд в работу

# Team Duty

`Core team` - Трифонов Михаил, Ахременко Григорий, Белов Алексей, Козлова Анна

> Несет ответственность за техническую часть проекта.
>
> Определять развитие UIKIT
>
> Определяет вид кодовой базы компонентов
>
> Проводит Review-кода компонентов.
>
> Задачи Review team

`Review team` - Шеховцов Кирилл, Бибин Егор, Авилов Дмитрий

> Определяет визуальную составляющую компоненты
>
> Определяет функциональность компоненты

---

`Team lead` - Трифонов Михаил

> Выстраивает процессы разработки.
>
> Занимается внешним развитием проекта.
>
> Занимается внутренним развитием проекта.

`Design lead` - Ларионова Юлия

> Определяет визуальную составляющую компонентов
>
> Лидит Design System

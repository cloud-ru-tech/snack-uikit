# Theme

## Installation
`npm i @sbercloud/uikit-product-theme`

## Import Style:

```
1. Ипортируем необходимые темы:
   import { globals, purple, purpleDark, ... } from "@sbercloud/uikit-product-theme";
2. Подключаем к проекту:
   <body className={`${globals} ${purple} ${purpleDark}`} />...</body>
3. Выбираем тему по умолчанию:
   <html data-theme="purple">...</html>
```

## Change Theme

```
1. Актуальная тема определена в `data-theme`, для смены темы меняем значения атрибута.
   Например(с помощью js):
   htmlElement.setAttribute("data-theme", "purpleDark");
```

[Changelog](./CHANGELOG.md)

Colors library

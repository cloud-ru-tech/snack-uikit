# CONTRIBUTION GUIDE

## Общие положения

- **ВСЕ НЕОБХОДИМЫЕ КОМАНДЫ ИМЕЮТСЯ В NPM SCRIPTS**.
- Если вы все делаете правильно, поднятие и обновление зависимостей пакетов/пакетами происходит в автоматическом режиме, ровно как и changelog.
- Мы исходим из того, что любые изменения в данном репозитории вносятся согласно [Conventional Commits](https://conventionalcommits.org):
    - **fix:** a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
    - **feat:** a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
    - **BREAKING CHANGE:** a commit that has a footer **BREAKING CHANGE:**, or appends a **!** after the type/scope (**fix(FF-11)!:**), introduces a breaking
      API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
    - types other than fix: and feat: are allowed, e.g., *@commitlint/config-conventional* (based on the Angular
      convention) recommends **build:**, **chore:**, **ci:**, **docs:**, **style:**, **refactor:**, **perf:**, **test:**, and others.
    - footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.


- Используется только пакетный менеджер `NPM`.
- Правило: один коммит - один пакет.

## NPM Scripts

- `add-package` - создание нового пакета в рамках монорепозитория
- `build:storybook` - сборка исходников сторибука для *CI/CD*
- `build:packages` - пересборка пакетов вместе с установкой пакетных зависимостей, глобальные должны быть при этом установлены
- `build:css` - пересборка стилевых файлов в пакетах: scss -> css
- `build:ts` - пересборка файлов с кодом в пакетах: ts -> js 
- `changelog` - генерация changelog в измененных пакетах (используется только локально, дает возможность проверить корректность содержания коммитов) 
- `clean:all` - вызывает **clean:dist** и **clean:modules**
- `clean:buildinfo` - удаляет вспомогательные файлы для ts-сборки (**.tsbuildinfo**)
- `clean:dist` - удаляет **dist** в пакетах
- `clean:modules` - удаляет **node_modules** в пакетах
- `deps:all` - вызывает **deps:global** и **deps:packages**
- `deps:global` - устанавливает корневые зависимости и линкует пакеты между собой
- `deps:packages` - устанавливает зависимости внутри пакетов
- `deps:reinstall` - переустанавливает все зависимости начисто
- `storybook:all` - запуск локальной версии сторибука со *всеми* пакетами
- `storybook:ci` - запуск сторибука на *CI/CD*
- `storybook:partial` - запуск локальной версии сторибука с *определенными* пакетами
- `test:coverage` - генерит *cobertura* репорт для построчного покрытия тестами
- `test:testcafe` - запускает testcafe и прогоняет тесты
- `test:testcafe:local` - запускает testcafe в watch режиме, перезапускает при изменении исходного кода теста
- `test:ci` - запуск сервера сторибук и тестов на нем для *CI/CD*

## Структура проекта

1. все компоненты лежат в папке `./packages`.
2. Структура папок пакетов:

```text
packages
  some-package
    src
    |  components
    |  |__Some
    |  |  |__index.ts
    |  |  |__Some.tsx
    |  |  |__styles.module.scss
    |  |  |__constants.ts (опционально)
    |  |  |__types.ts (опционально)
    |  |  |__utils.ts (опционально)
    |  |__index.ts
    |__styles.module.scss (опционально)
    |__constants.ts (опционально)
    |__types.ts (опционально)
    |__utils.ts (опционально)
    
    stories
    |__ Some.tsx
    
    __tests__
    |__some.ts
    
    package.json
    tsconfig.json
    README.md
    CHANGELOG.md
```

## Работа с токенами

[Репозиторий с токенами](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/figma-tokens)

* Оригинальные json-файлы с токенами лежат в папке [tokens](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/figma-tokens/-/tree/master/tokens)
* Файлы со стилями, которые требуется подключать непосредтственно в компоненты, создаются после сборки и будут лежать в папке `build/scss`

### Семантика токенов:
* Есть 3 слоя токенов - базовые, тематические и компонентные (лежат в папках Base, Theme и Components соответсвенно)
* Базовые - самые основные токены, внутри поделены еще на токены цветов, шрифтов и анатомии
* Тематические токены - ссылаются на базовые токены, сейчас есть две темы - Cloud и MLSpace (для цветов также две модификации - Light и Dark)
* Токены компонентов - ссылаются на тематические токены (либо напрямую на базовые, если не требуется темизация каких-либо св-в), поделены соответсвенно покомпонентно

### Типы токенов
* Обычные - токены содержат одно св-во и применяются к конкретному св-ву css с помощью функции `simple-var` либо напрямую через css-var, если это простая переменная
```scss
.buttonLabel {
  color: simple-var($theme-variables, "sys", "primary", "on-accent");
  // или
  color: var($sys-primary-on-accent);
}
```
* Композитные (composite, typography, border) - токен внутри содержит несколько св-в css - их нужно применять внутри класса с помощью миксина `composite-var`
```scss
.buttonLabel {
  @include composite-var($theme-variables, "sans", "label", "size-s");
  // или
  @include composite-var($sans-label-size-s);
}
```
* Случаи-исключения:
   * Токен для св-ва outline - в фигме для него нет специального типа, поэтому для него используется композитный токен типа border. Соответвенно, для него понадобится свой миксин `outline-var`
```scss
.button {
  &:focus-visible {
    @include outline-var($container-focused-available-size-s);
  }
}
```

### Как использовать токены в компонентах
1. Подключить пакет @sbercloud/figma-tokens в пакет компонента в uikit
2. Создать файл для компонента (напр., `ButtonFilled.tsx`) и scss-файл для стилей (`styles.module.scss`), который импортится в файл компонента
3. Заимпортить файлы с токенами в `styles.module.scss` (тематические, компонентные - какие нужны):
   * файлы с токенами компонентов по умолчанию уже включают в себя тематические токены
```scss
@import '@sbercloud/figma-tokens/build/scss/styles-theme-variables';
@import '@sbercloud/figma-tokens/build/scss/components/styles-tokens-***';
```
4. Собрать стили компонента по макетам в figma, подключая токены через `var`, `simple-var` или `composite-var`
   * в scss можно также добавлять миксины и различные функции, чтобы убирать дублирование кода, пример:
```scss
// пример миксина, в других случаях код может быть другой

$sizes: size-s, size-m, size-l;
$variants: label-only, icon-only, label-icon;

@mixin button-anatomy-styles {
  @each $size in $sizes {
    &[data-size="#{$size}"] {
      @each $variant in $variants {
        &[data-variant="#{$variant}"] {
          @include composite-var($button-filled, 'container', $size, $variant);
        }
      }
    }
  }
}

.button {
  @include button-anatomy-styles;
}
```
5. Файл scss импортится в компонент в виде объекта с класснеймами, и далее используется следующим образом:

```tsx
import classNames from './styles.module.scss';

export type ButtonFilledProps = {
  label?: string;
  size?: Size;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
};

export const ButtonFilled = ({ label, size, variant, disabled, loading }: ButtonFilledProps) => {
  return (
    <button
      className={classNames.button}
      data-size={size}
      data-variant={variant}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
    >
      <label className={classNames.buttonLabel}>{label}</label>
    </button>
  );
};

```

## Сценарии

### Начало работы с репозиторием

1. `npm ci` для получения всех уже объявленных зависимостей
2. `npm run build:packages` для сборки пакетов

### Запуск локального storybook

1. `npm run build:packages`
2. Для запуска storybook
   - со всеми пакетами `npm run storybook:all`
   - с определенными пакетами `npm run storybook:partial`

### Создание нового пакета

1. Создайте feature ветку от последнего master
2. Запустите команду `npm run build:packages`
3. Запустите команду `npm run add-package`
4. Выпустите превью-пакет на ветке с токенами в [основном репозитории](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/figma-tokens) и заиспользуйте его в uikit-e.
5. Реализуйте необходимый компонент или утилиту согласно Conventional commit approach
6. Создайте pull request
7. Получите аппрув
8. `git pull -r origin master`, если это необходимо
9. Зарелизьте токены для компонента:
   - Смержите ветку с токенами в [основном репозитории](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/figma-tokens)
   - Дождитесь выпуска версии в  основном репозитории, а затем синхронизации форков и выпуска версии в них:
      - [Форк Cloud Platform](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/figma-tokens-cloud-platform)
      - [Форк MLSpace](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/figma-tokens-mlspace)
   - Заиспользуйте новые версии токенов в uikit
10. Для релиза первой стабильной версии необходимо
   - `git fetch --all --prune --prune-tags `
   - запустить `npm run changelog`
   - В сгенерированном диффе поправить версии на необходимые
   - сделать коммит
   - запустить `lerna version --exact --message "Version bump"`
11. Убедитесь, что все изменения актуальны и правильны
12. Смержите в master

### Внесение изменений в существующий пакет

1. Создайте feature или bugfix ветку от последнего master
2. Запустите команду `npm run build:packages`
3. Внесите необходимые изменения согласно Conventional commit approach
4. Создайте pull request
5. Получите аппрув
6. Смержите вашу ветку в мастер.
7. Релиз пакетов произойдет на этапе CI, вам не нужно поднимать руками версии


### Тестирование

1. Запустите локальный storybook через `storybook:ci`
2. Откройте `http://localhost:6006/` для проверки работоспособности
3. Тесты запускаются все вместе, если необходимо запустить конкретный - пометьте .only интересующую fixture или test
4. Запустите `test:testcafe:local`
5. Любое изменение кода выбранного файла с тестами перезапустит их выполнение
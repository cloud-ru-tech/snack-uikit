# CONTRIBUTION GUIDE

## Общие положения

- **ВСЕ НЕОБХОДИМЫЕ КОМАНДЫ ИМЕЮТСЯ В NPM SCRIPTS**.
- Если вы все делаете правильно, поднятие и обновление зависимостей пакетов/пакетами происходит в автоматическом режиме, ровно как и changelog.
- Мы исходим из того, что любые изменения в данном репозитории вносятся согласно [Conventional Commits](https://conventionalcommits.org).

```text
The commit contains the following structural elements, to communicate intent to the consumers of your library:

fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
feat: a commit of the type feat introduces a new feature to the codebase
(this correlates with MINOR in Semantic Versioning).
BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking
API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the the Angular
convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.
```

- Любые изменения внесенные в удаленный репозиторий не мог быть перетерты через `git push --force` или аналогичные команды.
- Используется только пакетный менеджер `NPM`.
- Правило: один коммит - один пакет.

## NPM Scripts

- `add-package` - создание нового пакета в рамках монорепозитория
- `build:storybook` - сборка исходников сторибука для *CI/CD*
- `build:packages` - пересборка пакетов вместе с установкой пакетных зависимостей, глобальные должны быть при этом установлены
- `changelog` - генерация changelog в измененных пакетах (используется только локально, дает возможность проверить корректность содержания коммитов) 
- `clean:all` - вызывает **clean:dist** и **clean:modules**
- `clean:dist` - удаляет **dist** в пакетах
- `clean:modules` - удаляет **node_modules** в пакетах
- `deps:all` - вызывает **deps:global** и **deps:packages**
- `deps:global` - устанавливает корневые зависимости и линкует пакеты между собой
- `deps:packages` - устанавливает зависимости внутри пакетов
- `deps:reinstall` - переустанавливает все зависимости начисто
- `storybook:all` - запуск локальной версии сторибука со *всеми* пакетами
- `storybook:ci` - запуск сторибука на *CI/CD*
- `storybook:partial` - запуск локальной версии сторибука с *определенными* пакетами
- `test:coverage-all` - генерит *cobertura* репорт для построчного покрытия тестами
- `test:coverage-unstable` - считает покрытие тестов по компонентам с версией ниже *v1.0.0*
- `test:coverage-stable` - считает покрытие тестов по компонентам с версией не ниже *v1.0.0*
- `test:testcafe` - запускает testcafe и прогоняет тесты
- `test:testcafe:local` - запускает testcafe в watch режиме, перезапускает при изменении исходного кода теста
- `test:ci` - запуск сервера сторибук и тестов на нем для *CI/CD*

## Структура проекта

1. все компоненты и утилиты лежат в папке `./packages`.
2. Структура папок пакетов:

```text
packages
  some-package
    src
      components
        Some
          index.ts
          Some.tsx
          styled.ts
          themes.ts
          constants.ts (опционально)
        index.ts
    stories
      Some.tsx
    package.json
    README.md
    CHANGELOG.md
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
4. Реализуйте необходимый компонент или утилиту согласно Conventional commit approach
5. Создайте pull request
6. Получите аппрув
7. `git pull -r origin master`, если это необходимо
8. для релиза первой стабильной версии необходимо
   - `git fetch --all --prune --prune-tags `
   - запустить `npm run changelog`
   - В сгенерированном диффе поправить версии на необходимые
   - сделать коммит
   - запустить `lerna version --exact --message "Version bump"`
9. Убедитесь, что все изменения актуальны и правильны
10. Смержите в master

### Внесение изменений в существующий пакет

1. Создайте feature или bugfix ветку от последнего master
2. Запустите команду `npm run build:packages`
3. Внесите необходимые изменения согласно Conventional commit approach
4. Создайте pull request
5. Получите аппрув
6. Смержите вашу ветку в мастер.
7. Релиз пакетов произойдет на этапе CI, вам не нужно поднимать руками версии

### Docker Image

1. Запустите команду `npm run deps:all && npm run build:packages`
2. `docker build -t uikit:0.0.1 .`
3. `docker run -t -p 8080:80 uikit:0.0.1`
4. Откройте `http://localhost:8080/`

### Тестирование

1. Запустите локальный storybook через `storybook:ci`
2. Откройте `http://localhost:6006/` для проверки работоспособности
3. Тесты запускаются все вместе, если необходимо запустить конкретный - пометьте .only интересующую fixture или test
4. Запустите `test:testcafe:local`
5. Любое изменение кода выбранного файла с тестами перезапустит их выполнение
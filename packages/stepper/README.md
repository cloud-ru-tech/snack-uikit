# Stepper

Компонент отображения состояния пошагового процесса.

## Installation
`npm i @snack-ui/stepper`

[Changelog](./CHANGELOG.md)

#### Использование

Компонент принимает массив шагов. В проп children принимает render-колбек, в который отдает сам компонент, методы управления и поля состояния.
При вызове метода `goNext` вызывается валидация текущего шага. Функция валидации должна вернуть результат валидации в Promise. При успешной валдиции компонент переходит на следующий шаг, а при ошибке остается на текущем.
При вызове метода `goPrev` компонент переходит на предыдущий шаг.


```tsx
const steps = [
  { title: 'Step #1', validation: validation1 },
  { title: 'Step #2', validation: validation2 },
  { title: 'Step #3', validation: validation3 },
  { title: 'Step #4', validation: validation4 },
]

<Stepper steps={steps}>
  {({
    stepper, // JSX элемент компонента
    isCompleted, // состояние завершенности всей цепочки
    goNext, // функция перехода к след. шагу
    goPrev, // функция перехода к предыдущему шагу
  }) => (
    <>
      {stepper}

      <button onClick={() => goPrev()}>go back</button>
      <button onClick={() => goNext()}>go next</button>
    </>
  )}
</Stepper>
```


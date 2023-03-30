# Pagination

## Installation
`npm i @snack-ui/pagination`

## TODO

- обновить цвета pagination slider после переработки палитры
- подумать о семантике кнопок навигации (возможно, использовать ссылки вместо кнопок и добавлять на них href)
- пересмотреть механизм переключения страницы при нажатие на многоточие

## Example

```typescript jsx
import { Pagination, PaginationSlider } from "@snack-ui/pagination";

function App() {
  const [page, setPage] = useState(args.page);

  return (
    <>
      <Pagination page={page} onChange={setPage} total={10}/>
      <PaginationSlider page={page} onChange={setPage} total={10}/>
    </>
  );
}
```

## Props

### Pagination

```typescript jsx
type PaginationProps = WithSupportProps<{
  total: number;
  page: number;
  onChange(page: number): void;
}>;
```

### PaginationSlider

```typescript jsx
type PaginationSliderProps = WithSupportProps<{
  total: number;
  page: number;
  onChange(page: number): void;
}>;
```

[Changelog](./CHANGELOG.md)



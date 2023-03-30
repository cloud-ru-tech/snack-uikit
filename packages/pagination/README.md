# Pagination

## Installation
`npm i @snack-ui/pagination`

## Examples

```typescript jsx
import { Pagination } from "@snack-ui/pagination";

function App() {
  const [page, setPage] = useState(args.page);

  return <Pagination page={page} onChange={setPage} total={10}/>;
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

[Changelog](./CHANGELOG.md)



# Drop Zone

## Installation

`npm i @snack-ui/drop-zone`

## TODO

- `accept` правильно работает после клика, но не работает для drop
- drop в `disabled` режиме приводит к открытию файла в отдельной вкладке (дефолтное поведение браузера)
- Increase coverage
- Reconsider markup (button should contain no elements inside)

## Props

```typescript jsx
enum UploadMode {
  Single = 'Single',
  Multiple = 'Multiple',
}

type DropZoneProps = WithSupportProps<{
  className?: string;
  onFilesUpload(files: File[]): void;
  title?: string;
  description?: ReactNode;
  disabled?: boolean; // Default false
  mode?: UploadMode; // Default Multiple
  accept?: string;
}>;

type HiddenDropZoneProps = DropZoneProps & { children: ReactNode; };
```

# Loaders

## Installation
`npm i @snack-ui/loaders`

[Changelog](./CHANGELOG.md)

## Props

### ProgressBar

```typescript jsx
enum Size {
  SizeS = 'size-s',
  SizeXS = 'size-xs',
}

type ProgressBarProps = WithSupportProps<{
  progress: number;
  size: Size;
}>
```

### ProgressBarPage

```typescript jsx
type ProgressBarPageProps = WithSupportProps<{
  inProgress: boolean;
  animationDuration?: number; // Default 200
  incrementDuration?: number; // Default 800
  minimum?: number;
}>;
```

### Spinner & Sun

```typescript jsx
enum LoaderSize {
  SizeXS = 'size-xs',
  SizeS = 'size-s',
  SizeM = 'size-m',
  SizeL = 'size-l',
}

type SpinnerProps = WithSupportProps<{
  size?: LoaderSize;
}>;

type SunProps = WithSupportProps<{
  size?: LoaderSize;
}>;
```
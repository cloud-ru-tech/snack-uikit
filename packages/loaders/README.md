# Loaders

## Installation
`npm i @snack-ui/loaders`

[Changelog](./CHANGELOG.md)

## TODO
+ Composite var as single variable

## Props
```typescript jsx
enum Size {
  SizeS = 'size-s',
  SizeXS = 'size-xs',
}

type ProgressBarPageProps = WithSupportProps<{
  inProgress: boolean;
  animationDuration?: number; // Default 200
  incrementDuration?: number; // Default 800
  minimum?: number;
}>;

type ProgressBarProps = WithSupportProps<{
  progress: number;
  size: Size;
}>

enum LoaderSize {
  SizeXS = 'size-xs',
  SizeS = 'size-s',
  SizeM = 'size-m',
  SizeL = 'size-l',
}

type SpinnerProps = WithSupportProps<{
  size?: LoaderSize;
}>;

```


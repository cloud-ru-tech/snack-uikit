# Loaders

## Installation
`npm i @snack-ui/loaders`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
import {ProgressBar, ProgressBarPage, Spinner, Sun} from "@snack-ui/loaders";

<ProgressBar
  progress={20}
  size={ProgressBar.sizes.SizeXS}
/>

<ProgressBarPage
  inProgress={true}
  animationDuration={100}
  incrementDuration={500}
  minimum={0.2}
/>

<Spinner
  size={Spinner.sizes.SizeXS}
/>

<Sun
  size={Sun.sizes.SizeL}
/>
```

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
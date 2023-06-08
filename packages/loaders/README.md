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
  size={Spinner.sizes.XS}
/>

<Sun
  size={Sun.sizes.L}
/>
```

## Props

### ProgressBar

```typescript jsx
enum Size {
  S = 's',
  XS = 'xs',
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
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
}

type SpinnerProps = WithSupportProps<{
  size?: LoaderSize;
}>;

type SunProps = WithSupportProps<{
  size?: LoaderSize;
}>;
```
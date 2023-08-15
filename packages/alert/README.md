# Alert

## Installation

`npm i @snack-ui/alert`

[Changelog](./CHANGELOG.md)

## Example

```tsx
import { Alert, AlertTop } from '@snack-ui/alert';
import { InfoFilledSVG } from '@snack-ui/icons';

// Alert component displays a notification with an optional icon, title, description, and link.
// It can be used to provide information, warnings, errors, or success messages.

<Alert
  appearance={Alert.appearances.Neutral}
  link='Link Text'
  href='https://cloud.ru/'
  icon={true}
  title='Title'
  description='Title description'
  onClose={() => console.log('alert')}
/>;

// AlertTop component is similar to Alert but is positioned at the top of the screen.
// It can have an additional button with customizable text, icon, and click handler.

<AlertTop
  appearance={AlertTop.appearances.Neutral}
  link='Link Text'
  href='https://cloud.ru/'
  closeable={true}
  icon={true}
  title='Title'
  description='Title description'
  buttonText='Button Text'
  buttonOnClick={() => console.log('Button Clicked')}
  buttonIcon={<InfoFilledSVG />}
  onClose={() => console.log('alert top')}
/>;
```

## Props

```ts
enum Appearance {
  Neutral = 'neutral',
  Primary = 'primary',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

type AlertProps = {
  icon?: boolean;
  title?: string;
  description: string;
  link?: string;
  href?: string;
  onClose?: () => void;
  appearance: Appearance;
};

type AlertTopProps = {
  icon?: boolean;
  title?: string;
  description: string;
  link?: string;
  href?: string;
  onClose?: () => void;
  appearance: Appearance;
  buttonText?: string;
  buttonOnClick?: () => void;
  buttonIcon?: ReactElement;
};
```

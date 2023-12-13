# Toaster

## Installation
`npm i @snack-uikit/toaster`

[Changelog](./CHANGELOG.md)

## Usage

```typescript
import { toaster } from '@snack-uikit/toaster';

// create userAction toast
const userActionId = await toaster.userAction.success({ label });

// create systemEvent toast
const systemEventId = await toaster.systemEvent.success({ title, description });

// update userAction toast
toaster.userAction.update.error(userActionId, { label: 'new text' });

// update systemEvent toast
toaster.systemEvent.update.error(systemEventId, {
    title: 'new text',
    description: 'new description',
});

// dismiss userAction toast
toaster.userAction.dismiss(userActionId);

// dismiss systemEvent toast
toaster.systemEvent.dismiss(systemEventId);
```


## Props

```typescript jsx
type ToastUserActionLink = {
  text: string;
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
};

type ToastUserActionProps = Partial<RtToastContentProps> &
  WithSupportProps<{
    label: string;
    link?: ToastUserActionLink;
    className?: string;
  }>;

type ToastSystemEventLink = {
  text: string;
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
};

type ToastSystemEventProps = Partial<RtToastContentProps> &
  WithSupportProps<{
    title: string;
    description?: string;
    link?: ToastSystemEventLink;
    progressBar?: boolean;
    closable?: boolean;
    className?: string;
    onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
  }>;
```

### TODO

- Translations

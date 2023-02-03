# Utils

## Installation
`npm i @sbercloud/uikit-product-utils`

### Config provider

If component is mounted, then it extends html tag by current lang and current themes data-attributes, adds classes with colors to body. Controls for changing are enabled via `useTheme` and `useLanguage` hooks. 


### Dev utils

#### CreateTextProvider
creates text provider

```typescript jsx
import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-product-utils';

enum Texts {
  Hide = 'Hide',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Hide]: 'Скрыть',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Hide]: 'Hide',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'package-name');
```

#### ExtractSupportProps

return props matched to `/^(data-test|aria)-/` regexp

```typescript jsx
import { extractSupportProps } from '@sbercloud/uikit-product-utils';

const sampleProps = {
  ['data-test-id']: '1',
  ['aria-disabled']: true, 
  ['data-disabled']: false,
  onClick: () => {},
  value: '123'
}

extractSupportProps(sampleProps) => {
  ['data-test-id']: '1', 
  ['aria-disabled']: true
}   
```

#### ExtractDataTestProps

return props matched to `/^data-test-/` regexp

```typescript jsx
import { extractDataTestProps } from '@sbercloud/uikit-product-utils';

const sampleProps = {
  ['data-test-id']: '1',
  ['aria-disabled']: true,
  ['data-disabled']: false,
  onClick: () => {},
  value: '123'
}

extractDataTestProps(sampleProps) => {
  ['data-test-id']: '1'
}   
```

#### ExcludeSupportProps

return props not matched to `/^(data-test|aria)-/` regexp

```typescript jsx
import { excludeSupportProps } from '@sbercloud/uikit-product-utils';

const sampleProps = {
  ['data-test-id']: '1',
  ['aria-disabled']: true, 
  ['data-disabled']: false,
  onClick: () => {},
  value: '123'
}

excludeSupportProps(sampleProps) => {
  ['data-disabled']: false,
  onClick: () => {},
  value: '123'
}   
```

#### KeyboardSelectHandler

If you need to repeat mouse click behavior via keyboard pressing you may use following approach:

```typescript jsx
import { keyboardSelectHandler } from '@sbercloud/uikit-product-utils';


<div
...
onClick={changeTabHandler}
onKeyPress={keyboardSelectHandler(changeTabHandler)}
...
/>
```

In that case Space or Enter pressing when component in focus will be equivalent to regular click

#### UniqueId

If you need to get a unique string you may use following approach:

```typescript jsx
import { uniqueId } from '@sbercloud/uikit-product-utils';

uniqueId(); // '1'
uniqueId(); // '2'
uniqueId('foo'); // 'foo__1'
```

### Hooks

#### useLanguage

Require Config Provider to be mounted

```typescript jsx
import { useLanguage } from '@sbercloud/uikit-product-utils';

function Component() {
  const { languageCode, changeLanguage } = useLanguage();
}
```

#### useTheme

Require Config Provider to be mounted

```typescript jsx
import { useTheme } from '@sbercloud/uikit-product-utils';

function Component() {
  const { theme, changeTheme } = useTheme();
}
```

#### useForceUpdate

Component will rerender after each `rerender`'s function call.

```typescript jsx
import { useForceUpdate } from '@sbercloud/uikit-product-utils';

function Component() {
  const rerender = useForceUpdate();
  ...
  rerender(); // <- will lead to rerender  
}
```

#### useForceUpdateOnPageLoadedCompletely

Component will rerender after window's `load` event happened.

Could be helpfull in cases when you need await for css applied.

```typescript jsx
import { useForceUpdateOnPageLoadedCompletely } from '@sbercloud/uikit-product-utils';

function Component() {
    useForceUpdateOnPageLoadedCompletely(); 
}
```

#### useUniqueId

Returns a unique string.

```typescript jsx
import { useUniqueId } from '@sbercloud/uikit-product-utils';

function Component() {
  const id = useUniqueId();
}
```

#### useEventHandler

A hook to define an event handler with an always-stable function identity.

```tsx
import { useEventHandler } from '@sbercloud/uikit-product-utils';

function Chat() {
  const [text, setText] = useState('');

  // always the same function (even if `text` changes)
  const handleClick = useEventHandler(() => {
    sendMessage(text);
  });

  return <SendButton onClick={handleClick} />;
}
```


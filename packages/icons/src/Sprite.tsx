import { memo, useState } from 'react';

import { isBrowser, useLayoutEffect } from '@snack-uikit/utils';

function SpriteInner({ content }: { content: string }) {
  const [div] = useState(isBrowser() ? document.createElement('div') : undefined);

  if (isBrowser() && div && div.parentNode !== document.body) {
    div.style.display = 'none';
    div.innerHTML = content;
    document.body.prepend(div);
  }

  useLayoutEffect(() => {
    if (div) {
      return () => {
        document.body.removeChild(div);
      };
    }
  }, [div]);

  useLayoutEffect(() => {
    if (div) {
      if (div.parentNode !== document.body) {
        div.style.display = 'none';
        document.body.prepend(div);
      }

      div.innerHTML = content;
    }
  }, [content, div]);

  return null;
}

export const Sprite = memo(SpriteInner);

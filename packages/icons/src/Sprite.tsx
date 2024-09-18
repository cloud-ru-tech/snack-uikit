import { memo, useState } from 'react';

import { useLayoutEffect } from '@snack-uikit/utils';

function SpriteInner({ content }: { content: string }) {
  const [div, setDiv] = useState<HTMLDivElement>();

  useLayoutEffect(() => {
    setDiv(document.createElement('div'));
  }, []);

  useLayoutEffect(() => {
    if (div) {
      div.style.display = 'none';
      document.body.prepend(div);

      return () => {
        document.body.removeChild(div);
      };
    }
  }, [div]);

  useLayoutEffect(() => {
    if (div) {
      div.innerHTML = content;
    }
  }, [content, div]);

  return null;
}

export const Sprite = memo(SpriteInner);

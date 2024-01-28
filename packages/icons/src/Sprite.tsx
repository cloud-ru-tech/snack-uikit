import { useLayoutEffect, useState, memo } from 'react';

function SpriteInner({ content }: { content: string }) {
  const [div] = useState(() => document.createElement('div'));

  useLayoutEffect(() => {
    div.style.display = 'none';
    document.body.prepend(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  useLayoutEffect(() => {
    div.innerHTML = content;
  }, [content]);

  return null;
}

export const Sprite = memo(SpriteInner);

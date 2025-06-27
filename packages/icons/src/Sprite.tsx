import { memo } from 'react';

type SpriteProps = {
  content: string;
  'data-test-id'?: string;
};

export const Sprite = memo(function Sprite(props: SpriteProps) {
  return (
    <div
      data-test-id={props['data-test-id']}
      style={{ display: 'none' }}
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
});

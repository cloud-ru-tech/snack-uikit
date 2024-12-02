import { TagBase, TagBaseProps } from '../TagBase';
import { TagLink, TagLinkProps } from '../TagLink';

export type TagProps = TagBaseProps | TagLinkProps;

export function isTagLinkProps(props: TagProps): props is TagLinkProps {
  return 'href' in props && props.href !== undefined;
}

export function Tag(props: TagProps) {
  if (isTagLinkProps(props)) {
    return <TagLink {...props} />;
  }

  return <TagBase {...props} />;
}

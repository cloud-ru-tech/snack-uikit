import { useState } from 'react';

import { WithTooltip } from '@snack-uikit/tooltip';

import { TagLinkProps, TagProps, TagWithTooltipProps } from '../../types';
import { TagBase } from '../TagBase';
import { TagLink } from '../TagLink';

export function isTagLinkProps(props: TagProps): props is TagLinkProps {
  return 'href' in props && props.href !== undefined;
}

function isTagWithTooltip(props: TagProps): props is TagWithTooltipProps {
  return 'tooltip' in props && props.tooltip !== undefined;
}

export function Tag(props: TagProps) {
  const [restrictOpenTooltip, setRestrictOpenTooltip] = useState(false);
  const isLinkTag = isTagLinkProps(props);

  if (!isTagWithTooltip(props)) {
    return isLinkTag ? <TagLink {...props} /> : <TagBase {...props} />;
  }

  const { tooltip } = props;
  const tooltipProps = tooltip && {
    ...tooltip,
    open: restrictOpenTooltip ? false : tooltip.open,
  };

  const tagBaseWithTooltipProps = { ...props, changeRestrictTooltipState: setRestrictOpenTooltip };

  return (
    <WithTooltip tooltip={tooltipProps}>
      {isLinkTag ? <TagLink {...props} /> : <TagBase {...tagBaseWithTooltipProps} />}
    </WithTooltip>
  );
}

import { useCallback, useEffect } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { extractSupportProps } from '@snack-ui/utils';

import { AccordionMode } from '../../constants';
import { AccordionContext } from '../../context';
import { AccordionProps } from '../../types';

export function Accordion({
  children,
  expanded: expandedProp,
  onExpandedChange: onExpandedChangeProp,
  expandedDefault,
  mode = AccordionMode.Single,
  className,
  ...rest
}: AccordionProps) {
  const [expanded, setExpanded] = useUncontrolledProp<string | string[] | null>(
    expandedProp,
    mode === AccordionMode.Single ? expandedDefault ?? null : expandedDefault ?? [],
    onExpandedChangeProp,
  );

  const onExpandedChange = useCallback(
    (id: string) => {
      if (mode === AccordionMode.Single) {
        return setExpanded((extendedId: string | null) => {
          if (id !== extendedId) {
            return id;
          }

          return null;
        });
      }

      return setExpanded((extendedIds: string[]) => {
        if (extendedIds.includes(id)) {
          return extendedIds.filter(extendedId => extendedId !== id);
        }

        return extendedIds.concat(id);
      });
    },
    [mode, setExpanded],
  );

  useEffect(() => {
    if (mode === AccordionMode.Single) {
      setExpanded((expanded: string[] | string | null) => {
        if (Array.isArray(expanded)) {
          return null;
        }

        return expanded;
      });

      return;
    }

    setExpanded((expanded: string[] | string | null) => {
      if (!Array.isArray(expanded)) {
        return [];
      }

      return expanded;
    });
  }, [mode, setExpanded]);

  return (
    <AccordionContext.Provider value={{ expanded, onExpandedChange }}>
      <div className={className} {...extractSupportProps(rest)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

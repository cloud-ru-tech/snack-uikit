import { createContext, useContext } from 'react';

type AccordionContextType = {
  expanded: string | null | string[];
  onExpandedChange: ((id: string) => void) | null;
};

export const AccordionContext = createContext<AccordionContextType>({ expanded: null, onExpandedChange: null });

export const useAccordionContext = () => useContext(AccordionContext);

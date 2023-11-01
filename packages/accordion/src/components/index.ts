import { AccordionPrimary as AccordionPrimaryComponent } from './AccordionPrimary';
import { AccordionSecondary as AccordionSecondaryComponent } from './AccordionSecondary';
import { CollapseBlockPrimary } from './CollapseBlockPrimary';
import { CollapseBlockSecondary } from './CollapseBlockSecondary';

export const AccordionPrimary = AccordionPrimaryComponent as typeof AccordionPrimaryComponent & {
  CollapseBlock: typeof CollapseBlockPrimary;
};

AccordionPrimary.CollapseBlock = CollapseBlockPrimary;

export const AccordionSecondary = AccordionSecondaryComponent as typeof AccordionSecondaryComponent & {
  CollapseBlock: typeof CollapseBlockSecondary;
};

AccordionSecondary.CollapseBlock = CollapseBlockSecondary;

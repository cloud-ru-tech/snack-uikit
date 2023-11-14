import { CollapseBlockHeader } from '../helperComponents';
import { AccordionPrimary as AccordionPrimaryComponent } from './AccordionPrimary';
import { AccordionSecondary as AccordionSecondaryComponent } from './AccordionSecondary';
import { CollapseBlockPrimary } from './CollapseBlockPrimary';
import { CollapseBlockSecondary } from './CollapseBlockSecondary';

export const AccordionPrimary = AccordionPrimaryComponent as typeof AccordionPrimaryComponent & {
  CollapseBlock: typeof CollapseBlockPrimary;
  CollapseBlockHeader: typeof CollapseBlockHeader;
};

AccordionPrimary.CollapseBlock = CollapseBlockPrimary;
AccordionPrimary.CollapseBlockHeader = CollapseBlockHeader;

export const AccordionSecondary = AccordionSecondaryComponent as typeof AccordionSecondaryComponent & {
  CollapseBlock: typeof CollapseBlockSecondary;
  CollapseBlockHeader: typeof CollapseBlockHeader;
};

AccordionSecondary.CollapseBlock = CollapseBlockSecondary;
AccordionSecondary.CollapseBlockHeader = CollapseBlockHeader;

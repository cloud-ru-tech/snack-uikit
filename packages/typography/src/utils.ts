import { FunctionComponent } from 'react';

import { GeneratedTypography } from './components/generatedVariants/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function attachVariants<C extends FunctionComponent<any> & Partial<GeneratedTypography>>(
  component: C,
  variants: GeneratedTypography,
): C & GeneratedTypography {
  for (const variantKey in variants) {
    component[variantKey as keyof GeneratedTypography] = variants[variantKey as keyof GeneratedTypography];
  }

  return component as C & GeneratedTypography;
}

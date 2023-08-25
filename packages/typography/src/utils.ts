import { Typography } from './components';
import { GeneratedTypography } from './components/generatedVariants/types';

export function attachVariants(variants: GeneratedTypography) {
  for (const variantKey in variants) {
    Typography[variantKey as keyof GeneratedTypography] = variants[variantKey as keyof GeneratedTypography];
  }
}

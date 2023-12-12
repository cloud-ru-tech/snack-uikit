import { promises } from 'fs';

import { FAMILY, PURPOSE, SIZE } from '../src/components/constants';

const FOLDER_PATH = 'src/components/generatedVariants/components';

async function generateComponent(family: string, purpose: string, size: string, folderPath: string) {
  const componentName = `${family}${purpose}${size}`;
  const componentContent = `// DO NOT EDIT IT MANUALLY

import { FAMILY, PURPOSE, SIZE } from '../../constants';
import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function ${componentName}({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      {...rest}
      family={FAMILY.${family}}
      purpose={PURPOSE.${purpose}}
      size={SIZE.${size}}
      tag={tag}
      className={className}
    >
      {children}
    </Typography>
  );
}
`;
  try {
    await promises.writeFile(`${folderPath}/${componentName}.tsx`, componentContent);
    // eslint-disable-next-line no-console
    console.log(`Creating ${componentName}.tsx component is success!`);
  } catch (err) {
    console.error('Error generation typography components', err);
  }
}

for (const family of Object.keys(FAMILY)) {
  for (const purpose of Object.keys(PURPOSE)) {
    for (const size of Object.keys(SIZE)) {
      generateComponent(family, purpose, size, FOLDER_PATH);
    }
  }
}

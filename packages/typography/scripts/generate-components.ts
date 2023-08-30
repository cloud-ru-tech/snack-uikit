import { promises } from 'fs';

import { Family, Role, Size } from '../src/components/contants';

const FOLDER_PATH = 'src/components/generatedVariants/components';

async function generateComponent(family: string, role: string, size: string, folderPath: string) {
  const componentName = `${family}${role}${size}`;
  const componentContent = `// DO NOT EDIT IT MANUALLY

import { Typography } from '../../Typography';
import { GeneratedTypographyProps } from '../types';

export function ${componentName}({ className, children, tag, ...rest }: GeneratedTypographyProps) {
  return (
    <Typography
      family={Typography.families.${family}}
      role={Typography.roles.${role}}
      size={Typography.sizes.${size}}
      tag={tag}
      className={className}
      {...rest}
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

for (const family of Object.keys(Family)) {
  for (const role of Object.keys(Role)) {
    for (const size of Object.keys(Size)) {
      generateComponent(family, role, size, FOLDER_PATH);
    }
  }
}

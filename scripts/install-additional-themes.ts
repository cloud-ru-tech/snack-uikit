import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

type Theme = {
  key: string;
  name: string;
  color: string;
  packageName: string;
  version?: string;
};

type TemplateValues = {
  imports: string[];
  body: string[];
};

const writeThemesFile = (values: TemplateValues) => {
  fs.writeFileSync(
    path.resolve(__dirname, '../themes.config.ts'),
    `
${values.imports.join('\n')}

type Theme = {
  key: string;
  name: string;
  color: string;
  defaultValue: {
    [key: string]: string;
  };
};

export const themes: Theme[] = [${values.body.join('\n')}];
  `,
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import('../snack.config.ts')
  .then(config => {
    const packages = config.themes.map((theme: Theme) => `${theme.packageName}@${theme.version || 'latest'}`);
    execSync(`npm i ${packages.join(' ')} --no-save`);

    const values = config.themes.reduce(
      (acc: TemplateValues, theme: Theme) => {
        acc.imports.push(`import ${theme.key} from "${theme.packageName}/build/css/brand.module.css";`);
        acc.body.push(
          `{ key: "${theme.key}", name: "${theme.name}", color: "${theme.color}", defaultValue: ${theme.key}},`,
        );
        return acc;
      },
      { imports: [], body: [] } as TemplateValues,
    );

    writeThemesFile(values);

    process.exit(0);
  })
  .catch(() => {
    writeThemesFile({ imports: [], body: [] });

    process.exit(0);
  });

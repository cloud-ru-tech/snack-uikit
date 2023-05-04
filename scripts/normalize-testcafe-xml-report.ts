import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const cwd = process.cwd();

const report = readFileSync(resolve(cwd, 'testcafe/reports/e2e/report.xml'), { encoding: 'utf-8' });
const fixed = report.replace(new RegExp(cwd, 'g'), () => '');

writeFileSync(resolve(cwd, 'testcafe/reports/report.xml'), fixed);

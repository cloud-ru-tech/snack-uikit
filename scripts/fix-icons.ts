import fs from 'fs';
import SVGFixer, { FixerOptions } from 'oslllo-svg-fixer';
import path from 'path';

const SOURCE_PATH = 'svgs/interface-icons';
const DESTINATION_PATH = 'svgs-fixed/interface-icons';
const FIXER_OPTION: FixerOptions = {
  // другие настройки тут - https://docs.oslllo.com/svg-fixer/master/#/getting-started/basic-usage?id=parameters
  throwIfDestinationDoesNotExist: false,
};

const fixIcons = async (source: string, destination: string) => {
  try {
    const report = await new SVGFixer(source, destination, FIXER_OPTION).fix();
    console.log(report.location.original.source, '- в работе');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};

const processFiles = (source: string) => {
  const files = fs.readdirSync(source);

  for (const file of files) {
    const filePath = path.join(source, file);
    const dirName = path.basename(path.dirname(filePath));
    const destPath = path.join(DESTINATION_PATH, dirName);
    const stats = fs.statSync(filePath);

    stats.isDirectory() ? processFiles(filePath) : fixIcons(filePath, destPath);
  }
};

fs.mkdirSync(DESTINATION_PATH);
processFiles(SOURCE_PATH);

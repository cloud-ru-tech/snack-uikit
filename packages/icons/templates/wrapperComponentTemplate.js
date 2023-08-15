const path = require('path');

const ICON_PROPS = `
export interface ISvgIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: string | number;
  style?: React.CSSProperties;
} 
`;
const ICON_SIZE_SINGLE = 1;
const IMPORTS = ["import { SVGProps } from 'react';"];
const DEFAULT_SIZE = 24;

const getComponent = (exportEntries, nameComponent, size) => {
  const isSingleIcon = exportEntries.length === ICON_SIZE_SINGLE;
  const DEPENDENCIES = exportEntries.concat(IMPORTS).join('\n');

  return `${DEPENDENCIES}
  
  ${ICON_PROPS}
  
  const ${nameComponent}SVG = ({ size = ${size}, ...props }: ISvgIconProps) => {
    return ${
      isSingleIcon
        ? '<SSVG size={size} {...props} />'
        : `size >= 20 ? <SSVG size={size} {...props} /> : <XsSVG size={size} {...props} />`
    }
  };

  export default ${nameComponent}SVG;`;
};

const capitalizeFirstLetter = str => str.replace(str[0], str[0].toUpperCase());

const getDirName = filePath => path.basename(path.dirname(filePath));

const getExportName = basename => {
  if (basename.slice(-2) === 'Xs') {
    return 'XsSVG';
  }
  return 'SSVG';
};

const iconWrapper = filePaths => {
  const componentName = capitalizeFirstLetter(getDirName(filePaths[filePaths.length - 1]));
  const exportEntries = filePaths.map(filePath => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = getExportName(basename);
    return `import { default as ${`${exportName}`} } from './${basename}';`;
  });
  return getComponent(exportEntries, componentName, DEFAULT_SIZE);
};

module.exports = iconWrapper;

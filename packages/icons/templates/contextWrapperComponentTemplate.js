const path = require('path');

const IMPORTS = ["import { SVGProps } from 'react';", "import { useIconContext } from '../../../context';"];

const ICON_PROPS = `
export interface ISvgIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: string | number;
  style?: React.CSSProperties;
} 
`;

const getComponent = nameComponent => {
  const DEPENDENCIES = IMPORTS.join('\n');

  return `${DEPENDENCIES}
  
  ${ICON_PROPS}
  
  const ${nameComponent}SVG = (props: ISvgIconProps) => {
    const { ${nameComponent}SVG } = useIconContext();

    return <${nameComponent}SVG {...props} />;
  };

  export default ${nameComponent}SVG;`;
};

const capitalizeFirstLetter = str => str.replace(str[0], str[0].toUpperCase());

const getDirName = filePath => path.basename(path.dirname(filePath));

const iconWrapper = filePaths => {
  const componentName = capitalizeFirstLetter(getDirName(filePaths[filePaths.length - 1].path));
  return getComponent(componentName);
};

module.exports = iconWrapper;

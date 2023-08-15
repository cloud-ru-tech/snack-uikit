const generateDataTestId = require('./generateDataTestId');

const iconComponentTemplate =
  ({ size }) =>
  ({ imports, interfaces, componentName, jsx, exports }, { tpl }) => {
    const testId = 'icon' + generateDataTestId(componentName);

    const componentProp = Boolean(size)
      ? `{ size = ${size}, ...props }: ISvgIconProps`
      : `{ size, ...props }: ISvgIconProps`;

    return tpl`
    ${`
    // DO NOT EDIT IT MANUALLY
    
    `}
    ${imports}
    ${interfaces}
    ${`
    
    `}
    export interface ISvgIconProps extends SVGProps<SVGSVGElement> {
      className?: string;
      size?: string | number;
      style?: React.CSSProperties;
    }

    const ${componentName} = (${componentProp}): React.ReactElement | null => {
      props.width = undefined;
      props.height = undefined;
      
      const testId = "${testId}";
      const isCustomSize = typeof size === "number"
      
      if(isCustomSize) {
        if(!props.style) props.style = {};
        props.style.width = size+"px";
        props.style.height = size+"px";
      }

      return ${jsx};
    }
    
    ${exports}
    `;
  };

module.exports = iconComponentTemplate;

import { ParserOptions } from 'react-docgen-typescript';

export const config: ParserOptions = {
  propFilter: (prop, component) => {
    if (component.name === 'Link' && prop.declarations !== undefined && prop.declarations.length > 0) {
      /**
       * Игнорировать наследуемые свойства полиморфного компонента (ElementType === 'a').
       */
      const hasPropAdditionalDescription = prop.declarations.find(
        declaration => !declaration.fileName.includes('node_modules'),
      );

      return Boolean(hasPropAdditionalDescription);
    }

    return true;
  },
};

import { Validator } from './types';

const maximumSize = 24;

export const validateIconSize: Validator = {
  error: `icon size is bigger than ${maximumSize}px, please make it smaller`,
  validate: ({ icon: { xml } }) =>
    (!xml.svg['@_width'] || Number(xml.svg['@_width']) <= maximumSize) &&
    (!xml.svg['@_height'] || Number(xml.svg['@_height']) <= maximumSize),
};

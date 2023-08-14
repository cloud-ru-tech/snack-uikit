import { DOCGEN_SECTION_PLACEHOLDER_END, DOCGEN_SECTION_PLACEHOLDER_START } from './constants';
import { Docgen } from './Docgen';

const docgen = new Docgen({
  packagesRoot: './packages',
  docPlaceholder: [DOCGEN_SECTION_PLACEHOLDER_START, DOCGEN_SECTION_PLACEHOLDER_END],
  parserOptions: {
    shouldExtractLiteralValuesFromEnum: true,
  },
});

docgen.run();

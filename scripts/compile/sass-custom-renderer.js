const { resolve } = require('path');
const { compile } = require('sass');

function sassRenderer(css, { fileName, logger }) {
  try {
    const { css: renderedCss } = compile(fileName, {
      loadPaths: [resolve(__dirname, '../../node_modules')],
    });
    return renderedCss;
  } catch (error) {
    logger.error(error.message);
  }
}

module.exports = sassRenderer;

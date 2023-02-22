import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

export async function postProcessCss({ css, from }: { css: string; from: string }) {
  const postCssPlugins = [autoprefixer(), require('postcss-discard-comments')];
  return postcss(postCssPlugins).process(css, { from });
}

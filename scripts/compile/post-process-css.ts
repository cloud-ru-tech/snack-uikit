import postcss from 'postcss';

export async function postProcessCss({ css, from }: { css: string; from: string }) {
  const postCssPlugins = [require('postcss-discard-comments')];
  return postcss(postCssPlugins).process(css, { from });
}

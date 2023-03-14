module.exports = function generateDataTestId(componentName) {
  return `${componentName}`.replace('Svg', '').replace(/[A-Z]/g, x => '-' + x.toLowerCase());
};

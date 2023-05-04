export function generateDataTestId(componentName: string) {
  return `icon${componentName.replace('SVG', '').replace(/[A-Z]/g, x => '-' + x.toLowerCase())}`;
}

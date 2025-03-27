export function getColumnStyleVars(id: string) {
  return {
    sizeKey: `--table-column-${id}-size`,
    flexKey: `--table-column-${id}-flex`,
  };
}

import { ComponentDoc, PropItemType } from 'react-docgen-typescript';

export class Markdown {
  readonly #doc: ComponentDoc;

  constructor(doc: ComponentDoc) {
    this.#doc = doc;
  }

  #lines(lines: string[]) {
    return lines.map(line => line.replaceAll('\n', ' ')).join('\n');
  }

  #blocks(blocks: string[]) {
    return blocks.join('\n');
  }

  #getProps() {
    return Object.entries(this.#doc.props).filter(([name]) => !name.match(/^(data-test|aria)-/));
  }

  #markdownTableCellEscape(str: string): string {
    return str.replaceAll('|', '&#124;');
  }

  #getTypeDescription({ name, value, raw }: PropItemType) {
    switch (name) {
      case `enum`: {
        if (raw && raw?.includes('|')) {
          // это union
          return raw;
        }
        const enumItems = Array.isArray(value)
          ? `: ${value
              .map(({ value, description }) => `\`${value}\`${description ? ` - ${description}` : ''}`)
              .join(', ')}`
          : '';
        return `enum ${raw}${enumItems}`;
      }
      default:
        return `\`${name}\``;
    }
  }

  #renderHeader(): string {
    return this.#blocks([`## ${this.#doc.displayName}`, `${this.#doc.description}`]);
  }

  #renderPropsTable(): string {
    return this.#lines([
      '### Props',
      '| name | type | required | default value | description |',
      '|------|------|----------|---------------|-------------|',
      ...this.#getProps().map(([name, { type, defaultValue, description, required }]) => {
        const defaultPropValue = defaultValue?.value || '-';
        const propRow = [name, this.#getTypeDescription(type), required.toString(), defaultPropValue, description]
          .map(this.#markdownTableCellEscape)
          .join(' | ');
        return `| ${propRow} |`;
      }),
    ]);
  }

  renderComponentSpec() {
    return this.#blocks([this.#renderHeader(), this.#renderPropsTable()]);
  }
}

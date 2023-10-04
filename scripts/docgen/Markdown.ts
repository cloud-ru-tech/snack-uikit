import { ComponentDoc, PropItemType } from 'react-docgen-typescript';

export class Markdown {
  private readonly doc: ComponentDoc;

  constructor(doc: ComponentDoc) {
    this.doc = doc;
  }

  private lines(lines: string[]) {
    return lines.map(line => line.replaceAll('\n', ' ')).join('\n');
  }

  private blocks(blocks: string[]) {
    return blocks.filter(Boolean).join('\n');
  }

  private getProps() {
    return Object.entries(this.doc.props).filter(([name]) => !name.match(/^(data-test|aria)-/));
  }

  private markdownTableCellEscape(str: string): string {
    return String(str).replaceAll('|', '\\|');
  }

  private getTypeDescription({ name, value, raw }: PropItemType) {
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

  private renderHeader(): string {
    return this.blocks([`## ${this.doc.displayName}`, this.renderTags(), this.doc.description]);
  }

  private isNotReactComponent() {
    return Object.keys(this.doc.tags || {}).includes('function');
  }

  private getDescription(name: string, description?: string): string {
    if (name === 'className' && !description) {
      return 'CSS-класс';
    }
    return description || '';
  }

  private renderTags() {
    const tags: string[] = [];
    for (const [tagName, tagValue] of Object.entries(this.doc.tags || {})) {
      if (tagName === 'function') {
        tags.push(`\`${tagValue}\``);
      }
    }
    return tags.length ? `${tags.join(' ')} \n` : '';
  }

  private renderPropsTable(): string {
    return this.lines([
      '### Props',
      '| name | type | default value | description |',
      '|------|------|---------------|-------------|',
      ...this.getProps()
        .sort(a => (a[1].required ? -1 : 1))
        .map(([name, { type, defaultValue, description, required }]) => {
          const defaultPropValue = defaultValue?.value || '-';
          const propRow = [
            // name
            required ? `${name}*` : name,
            // type
            this.getTypeDescription(type),
            // default value
            defaultPropValue,
            // description
            this.getDescription(name, description),
          ]
            .map(this.markdownTableCellEscape)
            .join(' | ');
          return `| ${propRow} |`;
        }),
    ]);
  }

  renderComponentSpec() {
    return this.isNotReactComponent()
      ? this.blocks([this.renderHeader()]) // TODO: для функций можно сделать рендер аргументов
      : this.blocks([this.renderHeader(), this.renderPropsTable()]);
  }
}

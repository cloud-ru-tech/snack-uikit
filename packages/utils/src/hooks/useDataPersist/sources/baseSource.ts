export abstract class BaseSource<TFilter> {
  protected parser: (value: string) => TFilter = JSON.parse;
  protected serializer: (value: TFilter) => string = JSON.stringify;
  protected abstract getFromSource(): string;
  protected abstract setToSource(value: string): void;

  constructor(
    public filterKey: string,
    private validate: (value: unknown) => value is TFilter,
    parser?: (value: string) => TFilter,
    serializer?: (value: TFilter) => string,
  ) {
    if (parser) {
      this.parser = parser;
    }
    if (serializer) {
      this.serializer = serializer;
    }
  }

  getFilter = () => {
    try {
      const filterFromQueryParams = this.getFromSource();
      const parsedValue = filterFromQueryParams ? (this.parser(filterFromQueryParams) as TFilter) : null;
      const isValid = parsedValue && this.validate(parsedValue);
      return isValid ? parsedValue : null;
    } catch {
      return null;
    }
  };

  setFilter = (filter: TFilter) => {
    const encodedValue = this.serializer(filter);
    this.setToSource(encodedValue);
  };
}

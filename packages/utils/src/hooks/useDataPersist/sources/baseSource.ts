export abstract class BaseSource<TData> {
  protected parser: (value: string) => TData = JSON.parse;
  protected serializer: (value: TData) => string = JSON.stringify;
  protected abstract getFromSource(): string;
  protected abstract setToSource(value: string): void;

  constructor(
    public filterKey: string,
    private validate: (value: unknown) => value is TData,
    parser?: (value: string) => TData,
    serializer?: (value: TData) => string,
  ) {
    if (parser) {
      this.parser = parser;
    }
    if (serializer) {
      this.serializer = serializer;
    }
  }

  getData = () => {
    try {
      const filterFromQueryParams = this.getFromSource();
      const parsedValue = filterFromQueryParams ? (this.parser(filterFromQueryParams) as TData) : null;
      const isValid = parsedValue && this.validate(parsedValue);
      return isValid ? parsedValue : null;
    } catch {
      return null;
    }
  };

  setData = (filter: TData) => {
    const encodedValue = this.serializer(filter);
    this.setToSource(encodedValue);
  };
}

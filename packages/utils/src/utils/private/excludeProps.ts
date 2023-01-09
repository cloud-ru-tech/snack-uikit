export function excludeProps(props: any, regexp: RegExp) {
  return Object.keys(props)
    .filter(prop => !prop.match(regexp))
    .reduce(
      (nextProps, prop) => ({
        ...nextProps,
        [prop]: props[prop],
      }),
      {},
    );
}

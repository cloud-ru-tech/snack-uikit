type CheckIsSearchUnavailableParams = {
  autocomplete: boolean;
  searchable: boolean;
  isSameValue: boolean;
};

export function checkisSearchUnavailable({ autocomplete, searchable, isSameValue }: CheckIsSearchUnavailableParams) {
  return autocomplete || !searchable || isSameValue;
}

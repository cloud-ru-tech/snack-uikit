export function moveCursorToEnd(input: HTMLInputElement | null) {
  const end = input?.value.length ?? 0;
  input?.setSelectionRange(end, end);
  input?.focus();
}

export function selectAll(input: HTMLInputElement | null) {
  input?.setSelectionRange(0, input?.value.length);
}

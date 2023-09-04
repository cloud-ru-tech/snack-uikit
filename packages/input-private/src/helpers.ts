export function moveCursorToEnd(input: HTMLInputElement | HTMLTextAreaElement | null) {
  const end = input?.value.length ?? 0;
  input?.setSelectionRange(end, end);
}

export function selectAll(input: HTMLInputElement | HTMLTextAreaElement | null) {
  input?.setSelectionRange(0, input?.value.length);
}

export function runAfterRerender(callback: () => void) {
  setTimeout(callback, 0);
}

export function isCursorInTheEnd(input: HTMLInputElement | HTMLTextAreaElement | null) {
  return input?.selectionStart === input?.value.length;
}

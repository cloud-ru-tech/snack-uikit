/**
 * Переносит курсор в конец поля ввода
 * @function  helper
 */
export function moveCursorToEnd(input: HTMLInputElement | HTMLTextAreaElement | null) {
  const end = input?.value.length ?? 0;
  input?.setSelectionRange(end, end);
}

/**
 * Выделяет весь текст в поле ввода
 * @function  helper
 */
export function selectAll(input: HTMLInputElement | HTMLTextAreaElement | null) {
  input?.setSelectionRange(0, input?.value.length);
}

/**
 * Откладывает колбек на следующий цикл EventLoop
 * @function  helper
 */
export function runAfterRerender(callback: () => void) {
  setTimeout(callback, 0);
}

/**
 * Проверяет находится ли курсор в конце поля ввода
 * @function  helper
 */
export function isCursorInTheEnd(input: HTMLInputElement | HTMLTextAreaElement | null) {
  return input?.selectionStart === input?.value?.length;
}

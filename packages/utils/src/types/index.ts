/**
 * Utility-тип, преобразующий константные значения объекта в union
 * @function type
 */
export type ValueOf<T> = T[keyof T];

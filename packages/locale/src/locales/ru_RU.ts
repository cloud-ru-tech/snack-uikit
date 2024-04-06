import { en_GB } from './en_GB';

export const ru_RU: typeof en_GB = {
  Table: {
    searchPlaceholder: 'Поиск',
    noData: {
      title: 'Нет данных',
    },
    noResults: {
      title: 'Не найдено',
      description: 'Попробуйте изменить параметры фильтрации',
    },
    errorData: {
      title: 'Ошибка загрузки данных',
      description: 'Попробуйте обновить страницу',
    },
    rowsOptionsLabel: 'Кол-во строк',
    export: 'Экспортировать в ',
  },
  Chips: {
    clearAllButton: 'Удалить все',
    allLabel: 'Все',
  },
  List: {
    noData: {
      description: 'Нет данных',
    },
    noResults: {
      description: 'Не найдено',
    },
    errorData: {
      description: 'Ошибка загрузки данных',
    },
    groupSelectButton: {
      reset: 'Сбросить все',
      select: 'Выбрать все',
    },
  },
  Fields: {
    limitTooltip: {
      max: 'Значение должно быть меньше либо равно ',
      min: 'Значение должно быть больше либо равно ',
    },
  },
  SearchPrivate: {
    placeholder: 'Поиск',
  },
};

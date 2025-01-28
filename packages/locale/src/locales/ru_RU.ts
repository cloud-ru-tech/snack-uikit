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
    allLabel: 'Все',
    apply: 'Применить',
    cancel: 'Отменить',
    add: 'Добавить',
    clear: 'Очистить',
    resetFilter: 'Сбросить значение фильтра',
    addButtonDisabledTip: 'Нет фильтров для добавления',
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
  ColorPicker: {
    apply: 'Применить',
    cancel: 'Отменить',
  },
  Calendar: {
    current: 'Сейчас',
    time: 'Время',
  },
  Toolbar: {
    hideFilters: 'Скрыть фильтры',
    showFilters: 'Показать фильтры',
  },
};

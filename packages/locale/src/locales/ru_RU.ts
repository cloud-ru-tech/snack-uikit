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
    groupSelectButton: {
      hide: 'Скрыть все',
      show: 'Показать все',
    },
    settingsHeaderLabel: 'Настройки отображения',
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
    presets: 'Пресеты',
    defaultPresets: {
      lastWeek: 'Последние 7 дней',
      lastTwoWeeks: 'Последние 14 дней',
      lastMonth: 'Последние 30 дней',
      lastQuarter: 'Последние 90 дней',
      lastThird: 'Последние 120 дней',
      lastYear: 'Последний 1 год',
      lastTwoYears: 'Последние 2 года',
    },
  },
  Toolbar: {
    hideFilters: 'Скрыть фильтры',
    showFilters: 'Показать фильтры',
  },
  ToastUpload: {
    title: {
      loading: 'Загрузка...',
      error: 'Ошибка загрузки...',
      pause: 'Загрузка приостановлена',
      errorUploaded: 'Ошибка при загрузке',
      uploaded: 'Загружено',
    },
  },
};

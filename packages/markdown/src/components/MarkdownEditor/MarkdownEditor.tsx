import cn from 'classnames';
import { useEffect, useState } from 'react';

import { FieldDecorator, FieldTextArea, VALIDATION_STATE } from '@snack-uikit/fields';
import { Switch } from '@snack-uikit/toggles';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { MODE } from '../../constants';
import { Mode } from '../../types';
import { Markdown } from '../Markdown';
import styles from './styles.module.scss';

export type MarkdownEditorProps = WithSupportProps<{
  /** Текст c разметкой */
  value: string;
  /** Callback смены текста */
  onChange: (newValue: string) => void;
  /** Начальное состояние редактора */
  defaultMode?: Mode;
  /** CSS-класс */
  className?: string;
  /** Текст ошибки для textarea */
  error?: string;
  /** Лейбл для textarea */
  label?: string;
  /** Плейсхолдер для textarea */
  placeholder?: string;
  /** Является ли поле обязательным */
  required?: boolean;
  /** Может ли ли пользователь изменять размеры поля (если св-во не включено, поле автоматически меняет свой размер) */
  resizable?: boolean;
}>;

export function MarkdownEditor({
  value,
  onChange,
  defaultMode,
  className,
  error,
  label,
  placeholder,
  required,
  resizable,
  ...rest
}: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<boolean>(false);

  useEffect(() => {
    setViewMode(defaultMode === MODE.View);
  }, [defaultMode]);

  return (
    <div className={cn(styles.editor, className)} {...extractSupportProps(rest)}>
      <div className={styles.control}>
        <div className={styles.switchWrapper}>
          <Switch checked={viewMode} onChange={setViewMode} />
          <Typography.SansBodyM>Предпросмотр</Typography.SansBodyM>
        </div>

        <Typography.SansBodyS className={styles.tip}>Поддерживается Markdown</Typography.SansBodyS>
      </div>

      {viewMode ? (
        <FieldDecorator label={label} required={required} error={error} size='m'>
          <Markdown
            value={value}
            className={styles.viewWrapper}
            data-validation={error ? VALIDATION_STATE.Error : VALIDATION_STATE.Default}
          />
        </FieldDecorator>
      ) : (
        <FieldTextArea
          value={value}
          onChange={onChange}
          label={label}
          placeholder={placeholder}
          required={required}
          resizable={resizable}
          error={error}
          size='m'
        />
      )}
    </div>
  );
}

import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Components } from 'react-markdown';

import { FieldDecorator, FieldTextArea, FieldTextAreaProps, VALIDATION_STATE } from '@snack-uikit/fields';
import { Switch } from '@snack-uikit/toggles';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { MODE } from '../../constants';
import { Mode } from '../../types';
import { Markdown } from '../Markdown';
import styles from './styles.module.scss';

export type MarkdownEditorProps = WithSupportProps<
  {
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
    /** Действие при клике на кнопку копирования кода*/
    onCodeCopyClick?(): void;
    /** Переопределение компонентов по умолчанию и добавление новых в CodeEditor*/
    components?: Components;
  } & Pick<FieldTextAreaProps, 'caption' | 'hint' | 'spellCheck' | 'labelTooltip' | 'labelTooltipPlacement' | 'footer'>
>;

export function MarkdownEditor({
  value,
  onChange,
  defaultMode,
  className,
  error,
  label,
  required,
  onCodeCopyClick,
  components,
  resizable,
  placeholder,
  hint,
  caption,
  spellCheck,
  labelTooltip,
  labelTooltipPlacement,
  footer,
  ...rest
}: MarkdownEditorProps) {
  const [isViewMode, setIsViewMode] = useState<boolean>(false);

  useEffect(() => {
    setIsViewMode(defaultMode === MODE.View);
  }, [defaultMode]);

  return (
    <div className={cn(styles.editor, className)} {...extractSupportProps(rest)}>
      <div className={styles.control}>
        <div className={styles.switchWrapper}>
          <Switch checked={isViewMode} onChange={setIsViewMode} />
          <Typography.SansBodyM>Предпросмотр</Typography.SansBodyM>
        </div>

        <Typography.SansBodyS className={styles.tip}>Поддерживается Markdown</Typography.SansBodyS>
      </div>

      {isViewMode ? (
        <FieldDecorator label={label} required={required} error={error} size='m'>
          <Markdown
            value={value}
            onCopyClick={onCodeCopyClick}
            className={styles.viewWrapper}
            components={components}
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
          hint={hint}
          labelTooltip={labelTooltip}
          labelTooltipPlacement={labelTooltipPlacement}
          footer={footer}
          caption={caption}
          spellCheck={spellCheck}
        />
      )}
    </div>
  );
}

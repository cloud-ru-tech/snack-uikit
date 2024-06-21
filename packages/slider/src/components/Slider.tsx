import cn from 'classnames';
import RcSlider, { SliderProps as RCSliderProps } from 'rc-slider';
import { ReactNode } from 'react';

import { Tooltip } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type SliderProps = Omit<
  RCSliderProps,
  | 'trackStyle'
  | 'handleStyle'
  | 'railStyle'
  | 'dotStyle'
  | 'activeDotStyle'
  | 'styles'
  | 'classNames'
  | 'prefixCls'
  | 'style'
  | 'handleRender'
  | 'vertical'
> & {
  handleTip?: boolean;
  tipFormatter?(value: string | number): ReactNode;
};

type TipFormatter = (value: string | number) => ReactNode;

const tipHandleRender = (tipFormatter?: TipFormatter): RCSliderProps['handleRender'] =>
  function (node, handleProps) {
    return (
      <Tooltip
        tip={tipFormatter ? tipFormatter(handleProps.value) : handleProps.value}
        open={handleProps.dragging || undefined}
        disableSpanWrapper
        trigger='hoverAndFocusVisible'
        className={styles.tipWrapper}
      >
        {node}
      </Tooltip>
    );
  };

export function Slider({ className, handleTip, tipFormatter, ...props }: SliderProps) {
  return (
    <RcSlider
      key={JSON.stringify(props.marks)}
      className={cn('osThemeSnack', className, {
        withMarks: Boolean(props.marks),
        reverse: Boolean(props.reverse),
      })}
      handleRender={handleTip ? tipHandleRender(tipFormatter) : undefined}
      {...props}
    />
  );
}

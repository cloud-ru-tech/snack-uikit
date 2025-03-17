import { TooltipProps, WithTooltip } from './components';

type UseElementWithTooltipParams<P> = {
  /** Настройки для тултипа */
  tooltip?: TooltipProps;
  /** Элемент, который будет обернут тултипом */
  Element: React.ComponentType<P>;
};

export function useElementWithTooltip<P>({ Element, tooltip }: UseElementWithTooltipParams<P>) {
  return function ElementWithTooltip(props: P & JSX.IntrinsicAttributes) {
    return (
      <WithTooltip tooltip={tooltip}>
        <Element {...props} />
      </WithTooltip>
    );
  };
}

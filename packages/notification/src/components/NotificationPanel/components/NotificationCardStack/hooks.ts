import { useCallback, useEffect, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

type UseAnimatedOpeningProps = {
  defaultOpen?: boolean;
  onOpenChanged?: (open: boolean) => void;
  duration: number;
};

type UseAnimatedOpeningResult = {
  open: boolean;
  isVisible: boolean;
  toggleOpen(): void;
};

export function useAnimatedOpening({
  defaultOpen = false,
  onOpenChanged,
  duration,
}: UseAnimatedOpeningProps): UseAnimatedOpeningResult {
  const [open, setOpen] = useUncontrolledProp(undefined, defaultOpen, onOpenChanged);
  const [isVisible, setIsVisible] = useState(open);
  const timeout = useRef<NodeJS.Timeout>();

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  useEffect(() => {
    clearTimeout(timeout.current);
    if (open) {
      setIsVisible(true);
    } else {
      timeout.current = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }
  }, [open, duration]);

  return {
    toggleOpen,
    open,
    isVisible,
  };
}

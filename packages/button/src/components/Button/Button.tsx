import { ReactElement, ReactText } from 'react';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonProps = {
  text: ReactText;
  variant?: Variant;
  icon?: ReactElement;
  className?: string;
  onClick(): void;
  disabled?: boolean;
};

export const Button = ({ text, variant = Variant.Filled, icon, className, onClick, disabled }: ButtonProps) => (
  <S.StyledButtonPrivate className={className} data-variant={variant} onClick={onClick} disabled={disabled}>
    {text}
    {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
  </S.StyledButtonPrivate>
);

Button.variants = Variant;

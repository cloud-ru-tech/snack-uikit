import { Variant } from './constants';

export const StyledButtonPrivate = `
  box-sizing: border-box;
  margin: 0;
  outline: 0;

  &::after,
  &::before {
    box-sizing: border-box;
  }

  border: none;

  cursor: pointer;
  text-transform: none;
  color: inherit;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-width: max-content;
  text-decoration: none;

  height: 44px;
  padding: 12px 16px;
  border-radius: 4px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  &[data-variant='${Variant.Filled}'] {
    fill: var(--button-filled-primary-size-s-label-icon-enabled-fill);
    background-color: var(--button-filled-primary-size-s-label-icon-enabled-fill);
    color: var(--button-filled-primary-size-s-text-enabled-fill);

    :hover {
      fill: var(--button-filled-primary-size-s-label-icon-hovered-fill);
      background-color: var(--button-filled-primary-size-s-label-icon-hovered-fill);
      color: var(--button-filled-primary-size-s-text-hovered-fill);
    }

    :active {
      fill: var(--button-filled-primary-size-s-label-icon-pressed-fill);
      background-color: var(--button-filled-primary-size-s-label-icon-pressed-fill);
      color: var(--button-filled-primary-size-s-text-pressed-fill);
    }

    :disabled,
    &[disabled] {
      fill: var(--button-filled-primary-size-s-label-icon-disabled-fill);
      background-color: var(--button-filled-primary-size-s-label-icon-disabled-fill);
      color: var(--button-filled-primary-size-s-text-disabled-fill);
    }
  }
`;

export const IconWrapper = `
  margin-left: 8px;
`;

function getLoadingWheelAnimationPerChild(quantity: number, duration: number) {
  function getLoadingWheelAnimation(child: number) {
    return `
      &:nth-child(${child}) {
        animation-delay: ${(-child / quantity) * duration}ms;
        animation-duration: ${duration}ms;
      }
    `;
  }

  return Array.from({ length: quantity }, (_, index) => index + 1)
    .map(getLoadingWheelAnimation)
    .join('');
}

export const DEFAULT_STYLES = {
  COMMON: `
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  
    &::after,
    &::before {
      box-sizing: border-box;
    }
  `,
  BORDERLESS: `
    border: none;
    border-radius: 0;
  `,
};

export const ANIMATIONS = {
  TRANSITION: '0.2s ease-in-out',
  LOADING_WHEEL: `
    & > path {
      @keyframes loading-wheel {
        0% {
          opacity: 1;
        }

        90% {
          opacity: 0.125;
        }

        100% {
          opacity: 1;
        }
      }

      animation-iteration-count: infinite;
      animation-name: loading-wheel;
      animation-timing-function: linear;

      ${getLoadingWheelAnimationPerChild(8, 1000)};
    }
  `,
};

export const SHADOW = {
  SMALL: '0 2px 12px rgba(0, 0, 0, 0.04)',
  MEDIUM: '0 4px 20px rgba(0, 0, 0, 0.08)',
  LARGE: '0 8px 32px rgba(0, 0, 0, 0.08)',
};

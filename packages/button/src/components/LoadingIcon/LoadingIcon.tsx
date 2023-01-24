import { AriaAttributes } from 'react';

import classNames from './styles.scss';

export function LoadingIcon({ className }: AriaAttributes & { className?: string }) {
  return (
    <svg
      className={`${classNames.loadingWheel}${className ? ` ${className}` : ''}`}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      data-test-id='icon-loading-wheel-interface'
      id='LoadingWheelInterfaceSVG'
      style={{ width: 20, height: 20 }}
    >
      <path
        opacity='0.875'
        d='M5.24 4.115a.5.5 0 0 0-.708 0l-.354.353a.5.5 0 0 0 0 .707l2.907 2.907a.5.5 0 0 0 .707 0l.353-.354a.5.5 0 0 0 0-.707L5.24 4.115Z'
        fill='inherit'
      ></path>
      <path
        opacity='0.75'
        d='M2.499 9.187a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h4.11a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5h-4.11Z'
        fill='inherit'
      ></path>
      <path
        opacity='0.625'
        d='M4.046 14.699a.5.5 0 0 0 0 .707l.353.353a.5.5 0 0 0 .707 0l2.906-2.906a.5.5 0 0 0 0-.707l-.353-.354a.5.5 0 0 0-.707 0L4.046 14.7Z'
        fill='inherit'
      ></path>
      <path
        opacity='0.5'
        d='M9.25 17.501a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-4.11a.5.5 0 0 0-.5-.5h-.5a.5.5 0 0 0-.5.5v4.11Z'
        fill='inherit'
      ></path>
      <path
        opacity='0.375'
        d='M14.894 15.772a.5.5 0 0 0 .707 0l.353-.354a.5.5 0 0 0 0-.707l-2.906-2.906a.5.5 0 0 0-.707 0l-.353.353a.5.5 0 0 0 0 .707l2.906 2.907Z'
        fill='inherit'
      ></path>
      <path
        opacity='0.25'
        d='M17.501 10.687a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5h-4.11a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h4.11Z'
        fill='inherit'
      ></path>
      <path
        opacity='0.125'
        d='M15.821 5.163a.5.5 0 0 0 0-.707l-.353-.353a.5.5 0 0 0-.707 0l-2.906 2.906a.5.5 0 0 0 0 .707l.353.353a.5.5 0 0 0 .707 0l2.906-2.906Z'
        fill='inherit'
      ></path>
      <path
        d='M10.75 2.499a.5.5 0 0 0-.5-.5h-.5a.5.5 0 0 0-.5.5v4.11a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-4.11Z'
        fill='inherit'
      ></path>
    </svg>
  );
}

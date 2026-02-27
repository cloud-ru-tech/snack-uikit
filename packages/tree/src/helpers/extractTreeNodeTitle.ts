import { ExtendedTreeNodeProps } from '../types';

export const extractTreeNodeTitle = ({ title, getTitle }: ExtendedTreeNodeProps) =>
  typeof title === 'string' ? title : (getTitle?.() ?? '');

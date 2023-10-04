import { createContext, PropsWithChildren } from 'react';

export const SkeletonContext = createContext(false);

export type SkeletonContextProviderProps = PropsWithChildren<{
  /** Флаг состояния загрузки. Если значение true, будут отрисованы блоки скелетона. */
  loading: boolean;
}>;

export function SkeletonContextProvider({ loading, children }: SkeletonContextProviderProps) {
  return <SkeletonContext.Provider value={loading}>{children}</SkeletonContext.Provider>;
}

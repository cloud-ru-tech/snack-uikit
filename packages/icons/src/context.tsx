import { createContext, JSXElementConstructor, ReactNode, useContext } from 'react';
import * as Icons from './components';

export type IconProps = {
  size?: string | number;
  className?: string;
};

type IconMap = Record<keyof typeof Icons, JSXElementConstructor<IconProps>>;

const IconContext = createContext<IconMap>(Icons);

export function useIconContext() {
  return useContext(IconContext);
}

export function IconMapProvider({ children, iconMap }: { children?: ReactNode; iconMap?: Partial<IconMap> }) {
  return <IconContext.Provider value={{ ...Icons, ...iconMap }}>{children}</IconContext.Provider>;
}

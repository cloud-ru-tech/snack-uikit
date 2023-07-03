import { useEffect, useState } from 'react';

export function useThemeChange() {
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    const body = document.body;
    const observer = new MutationObserver(() => {
      const classList = Array.from(body.classList).join(' ');
      setClassName(classList);
    });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return className;
}

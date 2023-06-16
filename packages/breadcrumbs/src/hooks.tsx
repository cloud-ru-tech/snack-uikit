import debounce from 'lodash.debounce';
import { RefObject, useEffect, useState } from 'react';

import { BreadcrumbsConfig, BreadcrumbsConfigChain } from './types';

export type BreadcrumbsLayout = {
  setConfigs: (configs: BreadcrumbsConfig[]) => void;
  currentConfig?: BreadcrumbsConfigChain;
};

/**
 * Расчет способа отображения breadcrumbs работает следующим образом:
 * Каждый item может быть отображен в одном из режимов:
 *    full - целиком
 *    shortLabel - с использованием укороченного лейбла
 *    ellipsis - cо скруглением текста в ...
 *    collapse - спрятан в специальный узел "..." с тултипом.
 *  Для того чтоб эффективно распределить свободное по ширине пространство между айтемами в компоненте создается скрытый контейнер (HiddenChain),
 *  в котором рендерятся все айтемы во всех возможных способах отображения. Замеряется размер каждого из айтемов и записывается в sizeMap.
 *  Далее перебираются все возможные варианты отображения всей цепочки - конфиги (buildBreadcrumbsConfigs). У такого конфига есть два атрибута:
 *    width - суммарная ширина
 *    weight - вес, отображает общее количество сокращений, примененных к цепочке (например, отображение в режиме full - 0, сокращение shortLabel - +1, а ellipsis - +100 и тд)
 *  Для того чтоб отобразить breadcrumbs, нужно подобрать конфиг, максимальный по ширине, влезающий в контейнер, но с минимальным весом (наименьшим количеством сокращений).
 */
export function useBreadcrumbsLayout(containerRef: RefObject<HTMLElement>): BreadcrumbsLayout {
  const [currentConfig, setCurrentConfig] = useState<BreadcrumbsConfigChain | undefined>(undefined);
  const [containerWidth, setContainerWidth] = useState(containerRef.current?.offsetWidth || 0);
  const [configs, setConfigs] = useState<BreadcrumbsConfig[]>([]);

  /**
   * Подбор подходящего конфига триггерится изменением ширины контейнера и изменением набора конфигов
   */
  useEffect(() => {
    if (configs.length) {
      let [bestConfig] = configs;

      for (const config of configs) {
        if (config.width <= containerWidth) {
          if (bestConfig.width > containerWidth) {
            bestConfig = config;
          } else {
            if (bestConfig.weight > config.weight) {
              bestConfig = config;
            }
          }
        }
      }

      if (bestConfig) {
        setCurrentConfig(bestConfig.chain);
      }
    }
  }, [configs, containerWidth]);

  useEffect(() => {
    const visibleContainer = containerRef.current;

    if (!visibleContainer) {
      return;
    }

    const visibleContainerObserver = new ResizeObserver(
      debounce(
        ([
          {
            borderBoxSize: [{ inlineSize }],
          },
        ]) => {
          setContainerWidth(inlineSize);
        },
        100,
      ),
    );

    visibleContainerObserver.observe(visibleContainer);

    return () => {
      visibleContainerObserver.disconnect();
    };
  }, [containerRef]);

  return { setConfigs, currentConfig };
}

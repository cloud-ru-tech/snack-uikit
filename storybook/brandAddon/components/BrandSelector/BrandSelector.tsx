import { useGlobals } from '@storybook/api';
import { IconButton, Icons } from '@storybook/components';
import React, { useEffect, useState } from 'react';

import { Brand } from '../../../constants';
import { useCustomBrandContext } from '../../contexts';
import { useCustomStyles } from '../../hooks';
import { AddBrandPanel } from '../AddBrandPanel';
import { BrandOption, BrandOptionProps } from '../BrandOption';
import { Tooltip } from '../Tooltip';
import classNames from './styles.module.css';

type ToolbarItemProps = {
  defaultOpen?: boolean;
};

const basicOptions: BrandOptionProps[] = [
  { value: Brand.Default, color: '#95cdf3', title: 'Default' },
  { value: Brand.Cloud, color: '#69ce86', title: 'Cloud' },
  { value: Brand.MLSpace, color: '#a69dfa', title: 'MLSpace' },
];

export function BrandSelector({ defaultOpen = false }: ToolbarItemProps) {
  const [globals, updateGlobals] = useGlobals();
  const { brand } = globals;
  const [open, setOpen] = useState(defaultOpen);
  const [addPanelOpen, setAddPanelOpen] = useState(false);

  const { brands } = useCustomBrandContext();

  const brandOptions: BrandOptionProps[] = [
    ...basicOptions,
    ...brands.map(config => ({ value: config.key, color: config.color, title: config.title })),
  ];

  const handleSelectOption = (value: string) => {
    updateGlobals({ brand: value });
    setOpen(false);
  };

  const handleAddBrand = () => setAddPanelOpen(false);

  useCustomStyles(brand);

  useEffect(() => {
    const element = document.getElementById('storybook-preview-wrapper');

    if (element) {
      element.style.background = 'var(--sys-neutral-background)';
    }
  }, []);

  return (
    <Tooltip
      open={open}
      setOpen={setOpen}
      placement='bottom'
      tooltip={
        <div className={classNames.panel}>
          {brandOptions.map(item => (
            <BrandOption key={item.value} {...item} selected={brand === item.value} onSelect={handleSelectOption} />
          ))}

          <Tooltip
            open={addPanelOpen}
            setOpen={setAddPanelOpen}
            placement='right'
            tooltip={<AddBrandPanel onAdd={handleAddBrand} />}
          >
            <div className={classNames.option}>
              Добавить бренд
              <Icons icon='add' width={16} />
            </div>
          </Tooltip>
        </div>
      }
    >
      <IconButton active={open} title='Добавить бренд'>
        <Icons icon='circle' color={brandOptions.find(op => op.value === brand)?.color} />
      </IconButton>
    </Tooltip>
  );
}

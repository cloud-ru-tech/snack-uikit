import { IconButton, Icons } from '@storybook/components';
import cn from 'classnames';
import React, { MouseEvent, MouseEventHandler, useState } from 'react';

import { useCustomBrandContext } from '../../contexts';
import { EditBrandPanel } from '../EditBrandPanel';
import { Tooltip } from '../Tooltip';

export type BrandOptionProps = {
  value: string;
  color: string;
  title: string;
  selected?: boolean;
  onSelect?(value: string): void;
};

export function BrandOption({ value, title, color, selected, onSelect }: BrandOptionProps) {
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const { brands, deleteBrand } = useCustomBrandContext();
  const customBrand = brands.find(item => item.key === value);

  const renderCircle = (className: string) => <Icons icon='circle' color={color} width={16} className={className} />;

  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  const handleDeleteBrand: MouseEventHandler<HTMLButtonElement> = e => {
    stopPropagation(e);
    deleteBrand(value);
  };

  const handleSelectOption = () => onSelect?.(value);
  const handleUpdateBrand = () => setEditPanelOpen(false);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn('brand-select-option', customBrand ? 'brand-select-optionSmall' : '')}
      onClick={handleSelectOption}
      data-selected={selected || undefined}
    >
      {title}
      {customBrand ? (
        <div className={'brand-select-iconWrapper'}>
          {renderCircle('brand-select-circleCustomBrand')}

          <IconButton
            onClick={handleDeleteBrand}
            content={undefined}
            autoFocus={undefined}
            rel={undefined}
            rev={undefined}
          >
            <Icons icon='trash' />
          </IconButton>

          <Tooltip
            open={editPanelOpen}
            setOpen={setEditPanelOpen}
            placement='right'
            tooltip={<EditBrandPanel brand={customBrand} onUpdate={handleUpdateBrand} />}
            onReferenceClick={stopPropagation}
            onFloatingClick={stopPropagation}
          >
            <IconButton
              active={editPanelOpen}
              content={undefined}
              autoFocus={undefined}
              rel={undefined}
              rev={undefined}
            >
              <Icons icon='edit' />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        renderCircle('brand-select-circleDefaultBrand')
      )}
    </div>
  );
}

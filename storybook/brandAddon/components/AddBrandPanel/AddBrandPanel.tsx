import { Button } from '@storybook/components';
import React, { MouseEventHandler, useState } from 'react';

import { useCustomBrandContext } from '../../contexts';
import classNames from './styles.module.css';

type AddPanelProps = {
  onAdd?(): void;
};

export function AddBrandPanel({ onAdd }: AddPanelProps) {
  const [file, setFile] = useState<File>();
  const [brandKey, setBrandKey] = useState<string>();
  const [brandName, setBrandName] = useState<string>();
  const [brandColor, setBrandColor] = useState<string>();
  const { addBrand } = useCustomBrandContext();

  const handleAddBrand: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    if (brandKey && file && brandName && brandColor) {
      const reader = new FileReader();
      reader.addEventListener('load', event => {
        addBrand(brandKey, {
          title: brandName,
          color: brandColor,
          fileName: file.name,
          content: String(event.target?.result) ?? '',
        });
        onAdd?.();
      });
      reader.readAsText(file);
    }
  };

  return (
    <div className={classNames.panel}>
      <form className={classNames.form}>
        <div className={classNames.brandSettings}>
          <label htmlFor='key'>Ключ бренда</label>
          <input id='key' type='text' value={brandKey} onChange={e => setBrandKey(e.target.value)} />
          <label htmlFor='name'>Имя бренда</label>
          <input id='name' type='text' value={brandName} onChange={e => setBrandName(e.target.value)} />
          <label htmlFor='color'>Превью цвет</label>
          <input id='color' type='text' value={brandColor} onChange={e => setBrandColor(e.target.value)} />
        </div>
        <div>
          <input type='file' accept='.css' onChange={e => setFile(e.target.files?.[0])} />
        </div>
        <Button primary small onClick={handleAddBrand} disabled={!brandColor || !brandName || !brandKey || !file}>
          Добавить бренд
        </Button>
      </form>
    </div>
  );
}

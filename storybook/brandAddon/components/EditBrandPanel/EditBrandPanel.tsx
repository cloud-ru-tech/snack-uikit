import { ButtonFilled } from '@snack-ui/button';
import { useState } from 'react';

import { CustomBrandConfig } from '../../../customBrands';
import { useCustomBrandContext } from '../../contexts';
import classNames from './styles.module.css';

type EditBrandPanelProps = {
  brand: CustomBrandConfig;
  onUpdate?(): void;
};

export function EditBrandPanel({ brand, onUpdate }: EditBrandPanelProps) {
  const [file, setFile] = useState<File>();
  const [brandName, setBrandName] = useState(brand?.title);
  const [brandColor, setBrandColor] = useState(brand?.color);
  const { updateBrand } = useCustomBrandContext();

  const saveUpdates = (content?: string) => {
    if (!brand?.key) return;

    updateBrand(brand.key, {
      title: brandName,
      color: brandColor,
      ...(content ? { fileName: file?.name, content } : {}),
    });

    onUpdate?.();
  };

  const handleUpdateBrand = () => {
    if (!brand?.key) return;

    if (!file) {
      saveUpdates();
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', event => {
      saveUpdates(String(event.target?.result) ?? '');
    });
    reader.readAsText(file);
  };

  return (
    <div className={classNames.panel}>
      <form className={classNames.form}>
        <div className={classNames.brandSettings}>
          <label htmlFor='name'>Имя бренда</label>
          <input id='name' type='text' value={brandName} onChange={e => setBrandName(e.target.value)} />
          <label htmlFor='color'>Превью цвет</label>
          <input id='color' type='text' value={brandColor} onChange={e => setBrandColor(e.target.value)} />
        </div>
        <div>Текущий файл: {brand?.fileName}</div>
        <div>
          <input id='file' type='file' accept='.css' onChange={e => setFile(e.target.files?.[0])} />
        </div>
        <div className={classNames.buttonWrapper}>
          <ButtonFilled onClick={handleUpdateBrand} label={'Сохранить'} />
        </div>
      </form>
    </div>
  );
}

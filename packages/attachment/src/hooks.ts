import { useEffect, useState } from 'react';

import { isFileImage } from './helpers';

export function useImage(file?: File) {
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (file && isFileImage(file)) {
      const reader = new FileReader();

      reader.onloadstart = () => {
        setIsLoading(true);
      };

      reader.onloadend = () => {
        setIsLoading(false);

        const { result } = reader;
        if (result) {
          setImageData(result.toString());
        }
      };

      reader.readAsDataURL(file);
    } else {
      setImageData(undefined);
    }
  }, [file]);

  return { imageData, loading };
}

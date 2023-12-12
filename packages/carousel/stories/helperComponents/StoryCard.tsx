import { Card } from '@snack-uikit/card';
import { PlaceholderSVG } from '@snack-uikit/icons';

import imageBackground from '../assets/ImageProdContentBackground.jpg';
import { PROMO_FOOTER } from './constants';

const defaultArgs = {
  metadata: 'Metadata truncate 1 line',
  description: 'Description truncate 2 lines',
  body: 'Body text written in several lines',
  icon: PlaceholderSVG,
};

export function StoryCard({ title }: { title: string }) {
  const { body, description, metadata, icon } = defaultArgs;

  return (
    <Card
      image={<Card.Image mode='background' alt='alt' src={imageBackground} />}
      header={<Card.Header title={title} description={description} metadata={metadata} emblem={{ icon }} />}
      footer={<Card.Footer.Promo {...PROMO_FOOTER} />}
      outline
    >
      {body}
    </Card>
  );
}

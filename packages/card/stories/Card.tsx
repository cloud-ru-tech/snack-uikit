import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { KebabSVG, PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Card, CardProps } from '../src';
import {
  ACTION_FOOTER,
  EmblemMode,
  FooterMode,
  ICONS,
  IMAGE_MAP,
  IMAGE_MODE_MAP,
  ImageMode,
  OPTIONS,
  PROMO_FOOTER,
} from './constants';
import picture from './PictureProdContent.jpg';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Card',
  component: Card,
};
export default meta;

type StoryProps = CardProps &
  Omit<Card.HeaderProps, 'emblem'> &
  Card.ImageProps & {
    footerMode: FooterMode;
    imageMode: ImageMode;
    emblemMode: EmblemMode;
    body: string;
    imageSrc: string;
    pictureSrc: string;
    icon: IconPredefinedProps['icon'];
    clickable: boolean;
    showFading: boolean;
  };

const Template: StoryFn<StoryProps> = ({
  footerMode,
  imageMode,
  emblemMode,
  body,
  title,
  description,
  metadata,
  checked: checkedProp,
  icon,
  clickable,
  imageSrc,
  pictureSrc,
  showFading,
  disabled,
  ...args
}: StoryProps) => {
  const [checked, setChecked] = useState<boolean>(checkedProp || false);

  useEffect(() => {
    setChecked(checkedProp || false);
  }, [checkedProp]);

  const emblem = useMemo(() => {
    switch (emblemMode) {
      case EmblemMode.Icon: {
        return { icon };
      }
      case EmblemMode.Picture: {
        return { src: pictureSrc || picture, alt: 'picture' };
      }
      case EmblemMode.None:
      default: {
        return undefined;
      }
    }
  }, [emblemMode, icon, pictureSrc]);

  const image = useMemo(() => {
    switch (imageMode) {
      case ImageMode.Little:
      case ImageMode.Middle: {
        return <Card.Image mode={IMAGE_MODE_MAP[imageMode]} alt={'alt'} src={imageSrc || IMAGE_MAP[imageMode]} />;
      }
      case ImageMode.Background: {
        return (
          <Card.Image mode='background' alt={'alt'} src={imageSrc || IMAGE_MAP[imageMode]} hideFading={!showFading} />
        );
      }
      case ImageMode.None:
      default: {
        return undefined;
      }
    }
  }, [showFading, imageMode, imageSrc]);

  const footer = useMemo(() => {
    switch (footerMode) {
      case FooterMode.Promo: {
        return <Card.Footer.Promo {...PROMO_FOOTER} />;
      }
      case FooterMode.Action: {
        return <Card.Footer.Action {...ACTION_FOOTER} />;
      }
      case FooterMode.CallToAction: {
        return <Card.Footer.CallToAction label='Call to action' icon={<PlaceholderSVG />} />;
      }
      case FooterMode.Custom: {
        return <div>Custom Footer</div>;
      }
      default: {
        return undefined;
      }
    }
  }, [footerMode]);

  return (
    <div className={styles.wrapperResize}>
      <Card
        {...args}
        disabled={disabled}
        checked={checked}
        onClick={clickable ? () => setChecked(prevChecked => !prevChecked) : undefined}
        image={image}
        header={<Card.Header title={title} description={description} metadata={metadata} emblem={emblem} />}
        footer={footer}
        functionBadge={<Card.FunctionBadge icon={<KebabSVG />} options={OPTIONS} />}
      >
        {body}
      </Card>
    </div>
  );
};

export const card = Template.bind({});

card.args = {
  disabled: false,
  clickable: true,
  checked: false,
  multipleSelection: true,
  outline: false,
  promoBadge: 'Promo badge',
  size: 'm',
  title: 'Title truncate 1 line',
  metadata: 'Metadata truncate 1 line',
  description: 'Description truncate 2 lines',
  body: 'Body text written in several lines',
  footerMode: FooterMode.Promo,
  imageMode: ImageMode.Little,
  emblemMode: EmblemMode.Icon,
  icon: PlaceholderSVG,
  imageSrc: '',
  pictureSrc: '',
  showFading: true,
};

card.argTypes = {
  clickable: {
    name: '[Story]: Show behavior card with onClick',
    if: {
      arg: 'disabled',
      eq: false,
    },
  },
  checked: {
    if: {
      arg: 'clickable',
      neq: false,
    },
  },
  multipleSelection: {
    if: {
      arg: 'clickable',
      neq: false,
    },
  },
  outline: {
    if: {
      arg: 'disabled',
      eq: false,
    },
  },
  title: {
    name: '[Story]: Card.Header title',
    type: 'string',
  },
  description: {
    name: '[Story]: Card.Header description',
    type: 'string',
  },
  metadata: {
    name: '[Story]: Card.Header metadata',
    type: 'string',
  },
  body: {
    name: '[Story]: Card Content',
    type: 'string',
  },
  footerMode: {
    name: '[Story]: Card.Footer mode',
    options: Object.keys(FooterMode),
    mapping: FooterMode,
    defaultValue: FooterMode.Promo,
    control: {
      type: 'radio',
    },
  },
  imageMode: {
    name: '[Story]: Card Image',
    options: Object.keys(ImageMode),
    defaultValue: ImageMode.Little,
    mapping: ImageMode,
    control: {
      type: 'radio',
    },
  },
  emblemMode: {
    name: '[Story]: Card.Header emblem',
    options: Object.keys(EmblemMode),
    defaultValue: EmblemMode.Icon,
    mapping: EmblemMode,
    control: {
      type: 'radio',
    },
  },
  icon: {
    name: '[Story]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    defaultValue: PlaceholderSVG,
    control: {
      type: 'select',
    },
  },
  imageSrc: {
    name: '[Story]: Image src',
  },
  pictureSrc: {
    name: '[Story]: Picture src',
  },
  showFading: {
    name: '[Story]: Card Image Background ShowFading',
  },
};

card.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/KM8oGbd6TljNpkvXirk9vs/branch/aYKNUllfgg1uHAByifBN2V/Cards',
  },
};

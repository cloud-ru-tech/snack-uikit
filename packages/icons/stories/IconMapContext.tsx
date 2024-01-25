import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DaySVG, HomeSVG, IconMapProvider, IconProps, NightSVG, QuestionSVG, SearchSVG } from '../src';
import classnames from './styles.module.scss';

type StoryProps = {
  size?: number;
  applyContext?: boolean;
};

const meta: Meta = {
  title: 'Components/Icons/Icon Context',
};
export default meta;

function HomeCustom({ size, className }: IconProps) {
  return (
    <svg className={className} viewBox='0 0 16 16' width={size} height={size} fill='currentColor'>
      <path d='M7.68 1.617a1.968 1.968 0 0 0-.827.403c-.849.736-5.418 4.819-5.462 4.881a.73.73 0 0 0 .088.955.726.726 0 0 0 .841.15c.073-.036 1.177-.998 2.835-2.472 1.493-1.328 2.744-2.421 2.78-2.43a.316.316 0 0 1 .13 0c.036.009 1.287 1.102 2.78 2.43 1.658 1.474 2.762 2.436 2.835 2.472.483.235 1.067-.134 1.067-.674a.788.788 0 0 0-.138-.431c-.032-.045-1.241-1.133-2.687-2.418-3.165-2.813-2.885-2.57-3.073-2.67-.288-.153-.435-.191-.782-.2a3.45 3.45 0 0 0-.387.004m-3.939 5.68a.815.815 0 0 0-.433.425c-.054.144-.055.192-.055 2.315 0 2.082.002 2.176.054 2.379a1.77 1.77 0 0 0 1.306 1.294c.218.054 6.556.054 6.774 0a1.77 1.77 0 0 0 1.306-1.294c.052-.203.054-.297.054-2.379 0-2.123-.001-2.171-.055-2.315A.765.765 0 0 0 12 7.253a.765.765 0 0 0-.692.469c-.053.143-.055.193-.055 2.224 0 1.256-.01 2.104-.025 2.144-.052.137-.137.163-.565.172l-.393.009-.01-1.755c-.01-1.541-.017-1.777-.056-1.927a1.771 1.771 0 0 0-.937-1.151c-.326-.161-.482-.184-1.267-.184-.785 0-.941.023-1.267.184a1.771 1.771 0 0 0-.898 1.015l-.062.174-.013 1.813-.013 1.813h-.839l-.074-.074-.074-.074-.013-2.152c-.015-2.445.001-2.278-.243-2.497a.755.755 0 0 0-.763-.159m4.873 1.49c.043.022.09.063.105.092.018.033.028.626.028 1.719v1.669H7.253v-1.669c0-1.088.01-1.686.028-1.719.061-.115.143-.13.714-.131.432-.001.557.007.619.039' />
    </svg>
  );
}

function QuestionCustom({ size, className }: IconProps) {
  return (
    <svg className={className} viewBox='0 0 16 16' fill='currentColor' width={size} height={size}>
      <path
        fill='inherit'
        fillRule='evenodd'
        d='M7.48 1.269c-1.383.142-2.525.576-3.549 1.347a8.621 8.621 0 0 0-1.137 1.091c-.771.923-1.282 2.074-1.479 3.333-.067.433-.067 1.487 0 1.92a6.882 6.882 0 0 0 1.072 2.787 7.05 7.05 0 0 0 1.904 1.891 6.88 6.88 0 0 0 2.749 1.047c.433.067 1.487.067 1.92 0a6.827 6.827 0 0 0 3.12-1.308c.326-.243 1.054-.971 1.297-1.297a6.827 6.827 0 0 0 1.308-3.12c.067-.433.067-1.487 0-1.92a6.882 6.882 0 0 0-1.072-2.787 6.596 6.596 0 0 0-.951-1.12C11.643 2.15 10.401 1.542 8.96 1.32c-.268-.041-1.247-.074-1.48-.051m.96 1.505c1.89.173 3.478 1.272 4.297 2.973a5.266 5.266 0 0 1 0 4.506 5.208 5.208 0 0 1-2.452 2.468c-1.805.872-3.871.658-5.497-.569a6.255 6.255 0 0 1-.944-.946c-1.608-2.118-1.419-5.047.448-6.914A5.22 5.22 0 0 1 8.44 2.774m-.933 1.014a3.21 3.21 0 0 0-1.251.49c-.613.409-1.003.889-1.003 1.234 0 .295.184.577.454.699.261.118.635.045.82-.162l.208-.23c.134-.148.404-.342.585-.419.462-.198 1.064-.187 1.497.026.486.24.712.675.644 1.243-.058.483-.217.669-.848.984-.846.423-1.197.811-1.322 1.463-.08.414-.034.66.164.88a.662.662 0 0 0 .583.239.66.66 0 0 0 .492-.211c.136-.136.19-.254.221-.487a.772.772 0 0 1 .073-.257c.027-.038.24-.166.493-.298.498-.259.704-.398.933-.626.421-.419.648-.93.716-1.614.14-1.397-.747-2.572-2.193-2.906-.262-.061-1.004-.089-1.266-.048m.301 6.968c-.367.103-.58.412-.548.799a.73.73 0 0 0 .74.684.754.754 0 0 0 .673-.412.902.902 0 0 0 .036-.593.764.764 0 0 0-.901-.478'
      />
    </svg>
  );
}

function SearchCustom({ size, className }: IconProps) {
  return (
    <svg className={className} viewBox='0 0 16 16' fill='currentColor' width={size} height={size}>
      <path
        fill='inherit'
        fillRule='evenodd'
        d='M6.68 1.283a6.166 6.166 0 0 0-2.053.597 5.989 5.989 0 0 0-3.064 3.509 5.993 5.993 0 0 0-.004 3.799 6.018 6.018 0 0 0 2.998 3.489 5.89 5.89 0 0 0 2.736.656c1.326 0 2.538-.408 3.684-1.24.028-.02.335.273 1.323 1.261 1.15 1.149 1.302 1.292 1.427 1.339a.746.746 0 0 0 .966-.966c-.047-.125-.19-.277-1.339-1.427-.988-.988-1.281-1.295-1.261-1.323.832-1.146 1.24-2.358 1.24-3.684 0-.945-.201-1.803-.625-2.666A5.89 5.89 0 0 0 9.96 1.88a6.069 6.069 0 0 0-3.28-.597M8 2.813c.97.152 1.849.606 2.535 1.311a4.516 4.516 0 0 1 1.254 2.529 6.517 6.517 0 0 1 0 1.28c-.231 1.505-1.139 2.76-2.475 3.425-1.42.706-3.048.627-4.427-.215A4.74 4.74 0 0 1 3.408 9.64a4.366 4.366 0 0 1-.64-2.347c0-1.03.291-1.913.895-2.72a4.563 4.563 0 0 1 3.364-1.81c.215-.014.729.012.973.05'
      />
    </svg>
  );
}

const Template: StoryFn<StoryProps> = ({ applyContext, size }) => (
  <div className={classnames.wrapper}>
    <IconMapProvider
      iconMap={applyContext ? { HomeSVG: HomeCustom, QuestionSVG: QuestionCustom, SearchSVG: SearchCustom } : undefined}
    >
      <DaySVG size={size} />
      <NightSVG size={size} />
      <HomeSVG size={size} />
      <QuestionSVG size={size} />
      <SearchSVG size={size} />
    </IconMapProvider>
  </div>
);

export const iconContext: StoryObj<StoryProps> = Template.bind({});

iconContext.args = {
  applyContext: false,
  size: 24,
};

iconContext.argTypes = {
  applyContext: {
    name: '[Story]: Apply custom context',
    type: 'boolean',
  },
  size: {
    type: 'number',
  },
};

iconContext.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/Ur8wo5KsEZzwsTWIHo29WG/Base-Icon?node-id=3%3A102&t=qCKiZ5yyQ2Eq95OX-0',
  },
};

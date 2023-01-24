import { styled } from '@linaria/react';
import { PieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';

import { H3_STYLES } from '@sbercloud/uikit-tokens-demo-typography';
import { Themes, useTheme } from '@sbercloud/uikit-tokens-demo-utils';

import * as S from '../styles';
import { DefaultChartProps } from '../types';

const Title = styled.h3`
  ${H3_STYLES};
  margin-bottom: 20px;
`;

const LIGHT_THEMES = [Themes.Purple, Themes.Green];

export const GroupChart = (props: DefaultChartProps) => {
  const { theme } = useTheme();
  const labelColor = LIGHT_THEMES.includes(theme) ? '#000' : '#fff';

  return (
    <S.Wrapper height={props.height}>
      <Title>{props.title}</Title>
      <PieChart
        data={props?.data}
        radius={pieChartDefaultProps.radius - 14}
        lineWidth={60}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        segmentsShift={1}
        paddingAngle={2}
        animate
        label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
        labelPosition={112}
        labelStyle={{
          fontSize: '5px',
          fill: labelColor,
          opacity: 0.75,
          pointerEvents: 'none',
        }}
      />
    </S.Wrapper>
  );
};

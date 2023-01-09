import { styled } from '@linaria/react';
import { PieChart } from 'react-minimal-pie-chart';

import { H3_STYLES } from '@sbercloud/uikit-product-typography';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { PURPLE } = EXPORT_VARS;

import * as S from '../styles';
import { SingleChartProps } from '../types';

const Title = styled.h3`
  ${H3_STYLES};
  margin-bottom: 60px;
`;

export const SingleChart = (props: SingleChartProps) => {
  return (
    <S.Wrapper height={props.height}>
      <Title>{props.title}</Title>
      <PieChart
        data={[{ value: props.value, color: `var(${PURPLE[100]})` }]}
        totalValue={props.total}
        lineWidth={20}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: '25px',
          fontFamily: 'sans-serif',
          fill: `var(${PURPLE[100]})`,
        }}
        labelPosition={0}
      />
    </S.Wrapper>
  );
};

import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { H2_STYLES } from '@sbercloud/uikit-product-typography';
import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { BERRY_RED, EMERALD_GREEN, PURPLE } = EXPORT_VARS;

import { GroupChart } from '../src/chart/GroupChart';
import { SingleChart } from '../src/chart/SingleChart';
import { PackagesStatistics } from '../src/types';

export default {
  title: 'Welcome/Statistics',
} as Meta;

const ChartsWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-auto-rows: 400px;
`;

const Title = styled.h1`
  ${H2_STYLES};
  margin-bottom: 60px;
`;

const Template: Story = () => {
  const count = process.env.PACKAGES_STATISTICS as unknown as PackagesStatistics;

  return (
    <div>
      <Title>Статистика</Title>

      {!count ? (
        <>Не удалось получить данные {'=('}</>
      ) : (
        <ChartsWrapper>
          <SingleChart height={70} value={count.all} total={count.all} title={'Общее количество пакетов'} />

          <GroupChart
            height={80}
            data={[
              {
                title: 'Стабильные',
                value: count.stable,
                color: `var(${EMERALD_GREEN[100]})`,
              },
              {
                title: 'Нестабильные',
                value: count.nonStable,
                color: `var(${BERRY_RED[100]})`,
              },
            ]}
            title={'Количество пакетов по секциям'}
          />

          <GroupChart
            height={80}
            data={[
              {
                title: 'Публичные',
                value: count.public,
                color: `var(${PURPLE[100]})`,
              },
              {
                title: 'Приватные',
                value: count.private,
                color: `var(${PURPLE[75]})`,
              },
            ]}
            title={'Количество пакетов по типу'}
          />
        </ChartsWrapper>
      )}
    </div>
  );
};

export const statistics = Template.bind({});
statistics.args = {};
statistics.argTypes = {};

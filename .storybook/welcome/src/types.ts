export enum PackageNames {
  Welcome = 'Welcome',
  Components = 'Components',
  NotStable = 'Not Stable',
  Typography = 'Typography',
  Theme = 'Theme',
  Utils = 'Utils',
}

export type ChartData = {
  title: string;
  value: number;
  color: string;
};

export type BaseChartProps = {
  title?: string;
  height: number;
};

export type DefaultChartProps = BaseChartProps & {
  data: ChartData[];
};

export type SingleChartProps = BaseChartProps & {
  value: number;
  total: number;
};

export type PackagesStatistics = {
  all: number;
  stable: number;
  nonStable: number;
  public: number;
  private: number;
};

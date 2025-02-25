export type StubData = {
  status: string;
  tree: string;
  col1: number;
  subRows?: StubData[];
  col2: number;
  col3: number | string;
  col4: number;
  col5: number;
  col6: number;
  date: number;
};

export type Filters = {
  single: string;
  multiple: string[];
  date: Date;
  dateRange: [Date, Date];
};

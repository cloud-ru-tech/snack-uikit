import { StatusAppearance } from '../src/helperComponents';
import { StubData } from './types';

const STATUSES = Object.keys(StatusAppearance);

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const numberFormatter = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 });

export function generateRows(count: number): StubData[] {
  const res: StubData[] = [];

  for (let i = 0; i < count; ++i) {
    const date = new Date(Math.floor(Math.random() * 1e13)).setFullYear(
      randomIntFromInterval(1980, 2030),
      randomIntFromInterval(1, 12),
      randomIntFromInterval(1, 30),
    );

    res.push({
      status: i === 3 ? 'Not' : STATUSES[randomIntFromInterval(0, STATUSES.length - 1)],
      col1: i * 5,
      col2: i * 5 + 1,
      col3: i * 5 + 2,
      col4: i * 5 + 3,
      col5: i * 5 + 4,
      col6: randomIntFromInterval(100_000, 999_999.99),
      date,
    });
  }

  return res;
}

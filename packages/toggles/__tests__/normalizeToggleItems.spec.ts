import { Mode } from '../src/constants';
import { normalizeToggleItems } from '../src/utils';

describe('normalizeToggleItems', () => {
  const getDataMock = () => [
    { checked: false, data: { id: '1', label: 'item1' } },
    { checked: false, data: { id: '2', label: 'item2' } },
    { checked: false, data: { id: '3', label: 'item3' } },
    { checked: false, data: { id: '4', label: 'item4' } },
  ];

  describe('Mode - radio', () => {
    it("shouldn't change already normal data", () => {
      expect(normalizeToggleItems(Mode.Radio, getDataMock())).toEqual(getDataMock());
    });

    it('should leave one checked item', () => {
      const items = getDataMock().map(item => ({ ...item, checked: true }));
      const result = getDataMock();
      result[0].checked = true;
      expect(normalizeToggleItems(Mode.Radio, items)).toEqual(result);
    });

    it('should leave one first checked item', () => {
      const items = getDataMock();
      items[1].checked = true;
      items[2].checked = true;
      const result = getDataMock();
      result[1].checked = true;
      expect(normalizeToggleItems(Mode.Radio, items)).toEqual(result);
    });
  });

  describe('Mode - checkbox', () => {
    it("shouldn't change already normal data", () => {
      expect(normalizeToggleItems(Mode.Checkbox, getDataMock())).toEqual(getDataMock());
    });

    it('should leave all checked items', () => {
      const items = getDataMock().map(item => ({ ...item, checked: true }));
      expect(normalizeToggleItems(Mode.Checkbox, items)).toEqual(items);
    });
  });
});

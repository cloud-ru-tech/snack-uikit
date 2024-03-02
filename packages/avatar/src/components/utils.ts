const SPACE = ' ';

export const getAbbreviation = (str: string, abbreviationLength: 1 | 2): string => {
  const trimStr = str.replace(/[^a-zа-яё\d\s]/gi, '').trim();

  if (!trimStr || trimStr.length < abbreviationLength) {
    return trimStr.toUpperCase();
  }

  const strParts = trimStr.split(SPACE);
  let abbreviation = trimStr;

  if (strParts.length > 1) {
    const firstLetter = strParts[0].charAt(0);
    const secondLetter = strParts[strParts.length - 1]?.charAt(0);
    abbreviation = `${firstLetter}${secondLetter}`.toUpperCase();
  }

  return abbreviation.slice(0, abbreviationLength).toUpperCase();
};

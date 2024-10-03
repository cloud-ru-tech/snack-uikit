import { ItemId } from './components';
import { ITEM_PREFIXES } from './constants';

/**
 * Возвращает id для элемента футера
 * @function  helper
 */
export const getFooterItemId = (id: ItemId) => `${ITEM_PREFIXES.footer}__${id}`;

/**
 * Возвращает id для элемента, подставляя перфикс
 * @function  helper
 */
export const getItemAutoId = (prefix: ItemId, id: ItemId) => [prefix, id].join('-');

/**
 * Возвращает id для дефолтного элемента
 * @function  helper
 */
export const getDefaultItemId = (id: ItemId) => getItemAutoId(ITEM_PREFIXES.default, id);

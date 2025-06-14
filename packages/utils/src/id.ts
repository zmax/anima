import { v4 as uuidv4 } from 'uuid';

/**
 * 生成一個符合 UUID v4 格式的唯一標識符。
 * 這是對 'uuid' 函式庫的封裝，以便未來可以輕易更換底層實現。
 * @returns 一個 UUID 字串。
 */
export const generateUuid = uuidv4;

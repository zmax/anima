// 檔案: packages/shared/src/types/item.ts
// 描述: 定義了「物品」這一基礎物件類型。

import type { GameObject } from './game-object';

/**
 * Item 介面代表所有可被拾取、攜帶、使用的非生命物件。
 * 它直接繼承自 GameObject。
 */
export interface Item extends GameObject {
  // 未來可以添加物品特有的屬性，例如：
  // weight?: number;
  // value?: number;
}
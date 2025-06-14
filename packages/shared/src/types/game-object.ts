// 檔案: packages/shared/src/types/game-object.ts
// 描述: 定義了遊戲世界中所有物件的基礎介面。

import type { Action } from './action';
import type { BlueprintId, InstanceId } from './ids';
import type { LivingObject } from './living-object';

/**
 * GameObject 是遊戲世界中所有實體的基礎。
 * 每個物件都有兩種ID來定義其身份，並包含基礎的名稱、別名和描述。
 */
export interface GameObject {
  /**
   * 實例 ID：該物件在運行時的唯一標識。
   */
  readonly instanceId: InstanceId;

  /**
   * 藍圖 ID：該物件的模板類型標識。
   */
  readonly blueprintId: BlueprintId;

  /**
   * 玩家看到的「真名」，可以是中文，可以有空格。
   */
  name: string;

  /**
   * 玩家可以用來指代此物件的關鍵字列表（通常是小寫）。
   * 指令解析器會主要使用這個列表。
   * @example ['sword', 'longsword', 'iron sword']
   */
  aliases: string[];

  /**
   * 當玩家觀察此物件時看到的詳細描述。
   */
  description: string;

  /**
   * 獲取此物件能為某個行動者提供的所有可用動作。
   * 這是一個框架核心方法，用於實現動態的互動系統。
   * @param actor - 嘗試與此物件互動的活物 (通常是玩家)。
   * @returns 一個 Action 陣列。
   */
  getActions(actor: LivingObject): Action[];
}
// 檔案: packages/shared/src/types/action.ts
// 描述: 定義了遊戲中的「動作」概念。

import type { LivingObject } from './living-object';
import type { GameObject } from './game-object';

/**
 * Action 代表一個潛在的、可執行的指令。
 * 它將指令的觸發詞（動詞）與其具體的執行邏輯和提供者綁定在一起。
 */
export interface Action {
  /**
   * 觸發此動作的動詞。
   * @example "pull", "read", "wield"
   */
  verb: string;

  /**
   * 提供此動作的物件實例。
   * 例如，"pull lever" 這個動作的 provider 就是 lever 物件。
   */
  provider: GameObject;

  /**
   * 當動作被觸發時，實際要執行的函式。
   * @param actor - 執行動作的活物。
   * @param params - 指令中解析出的其他參數，例如目標物件或輸入的文字。
   */
  execute: (actor: LivingObject, ...params: any[]) => void;
}
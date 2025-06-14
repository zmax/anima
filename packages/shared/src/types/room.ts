// 檔案: packages/shared/src/types/room.ts
// 描述: 定義了遊戲世界的基本空間單位——房間。

import type { GameObject } from './game-object';
import type { InstanceId } from './ids';

/**
 * Room 代表遊戲世界中的一個地點或場景。
 */
export interface Room extends GameObject {
  /**
   * 定義了從這個房間可以通往哪些方向以及目標房間的 instanceId。
   * @example new Map([['north', 'room_forest_02_inst_1'], ['south', 'room_town_square_inst_1']])
   */
  exits: Map<string, InstanceId>;
}
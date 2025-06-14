// 檔案: packages/shared/src/types/living-object.ts
// 描述: 定義了遊戲世界中的「活物」，如玩家角色和NPC。

import type { GameObject } from './game-object';
import type { InstanceId } from './ids';
import type { Item } from './item';
import type { Room } from './room';
import type { Action } from './action';

/**
 * LivingObject 是遊戲中所有有生命、能主動發起或接收動作的實體的基礎。
 * 它們是指令的發起者和執行者。
 */
export interface LivingObject extends GameObject {
  readonly isLiving: true;

  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;

  /**
   * 該活物的物品欄，在應用層通常表現為一個 Map。
   * key 為物品的 instanceId。
   */
  inventory: Map<InstanceId, Item>;

  /**
   * 該活物當前所在的房間。
   * 在應用層中，這是一個對 Room 物件的直接引用。
   * 在持久化到 Redis 時，通常只儲存 room 的 instanceId。
   */
  currentRoom: Room;

  /**
   * 一個動態的、即時的可用動作列表快取。
   * key 為動作的 verb (動詞)。
   */
  actions: Map<string, Action>;

  /**
   * 觸發重新計算可用動作集的函式。
   * 在任何可能影響可用動作的事件後被呼叫（例如移動、獲得/失去物品）。
   */
  updateActions(): void;
}
// 檔案: packages/core/src/objects/base-game-object.ts
// 描述: GameObject 介面的基礎實作。

// 從 shared 套件導入共享的類型定義
import {
  Action,
  BlueprintId,
  GameObject,
  InstanceId,
  LivingObject,
} from '@anima/shared';
// 導入 uuid 來生成唯一的實例 ID
import { generateUuid } from '@anima/utils';

/**
 * 用於創建 BaseGameObject 實例的選項。
 * 這些是從物件藍圖中讀取的靜態數據。
 */
export interface BaseGameObjectOptions {
  blueprintId: BlueprintId;
  name: string;
  description: string;
  aliases?: string[];
}

/**
 * BaseGameObject 是遊戲世界中所有物件的基礎類別。
 * 它提供了 GameObject 介面的通用實作。
 */
export class BaseGameObject implements GameObject {
  public readonly instanceId: InstanceId;
  public readonly blueprintId: BlueprintId;
  public name: string;
  public aliases: string[];
  public description: string;

  /**
   * 創建一個 BaseGameObject 的新實例。
   * @param options - 來自物件藍圖的初始化數據。
   */
  constructor(options: BaseGameObjectOptions) {
    // 自動生成一個唯一的實例 ID
    this.instanceId = generateUuid();

    // 從選項中設置物件屬性
    this.blueprintId = options.blueprintId;
    this.name = options.name;
    this.description = options.description;
    this.aliases = options.aliases ?? [];
  }

  /**
   * 基礎物件預設不提供任何動作。
   * 繼承此類別或使用 Mixin 的物件應該覆寫此方法以提供具體的動作。
   * @param _actor - 嘗試與此物件互動的活物。
   * @returns 一個空陣列。
   */
  public getActions(_actor: LivingObject): Action[] {
    return [];
  }
}
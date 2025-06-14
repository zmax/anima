// 檔案: packages/core/src/events/core-events.ts
// 描述: 定義框架核心層級的事件。

/**
 * CoreEvents 定義了由 @anima/core 引擎自身可能發出的一些基礎事件。
 * 遊戲邏輯層可以擴展這個介面來定義自己的事件。
 */
export interface CoreEvents {
  /**
   * 當遊戲主循環的一個 tick 完成時觸發。
   */
  'core:tick': {
    /**
     * 觸發此 tick 的高精度時間戳。
     */
    timestamp: number;
    /**
     * 自上一個 tick 以來的時間差（毫秒）。
     */
    deltaTime: number;
  };
}
// 檔案: packages/core/src/services/service.ts
// 描述: 定義了所有服務都必須遵守的基礎介面。

/**
 * Service 介面是所有模組化系統（如天氣、任務、經濟系統）的基礎。
 * 它定義了服務的生命週期方法。
 */
export interface Service {
  /**
   * 服務的唯一名稱，用於註冊和獲取。
   */
  readonly name: string;

  /**
   * 在服務被註冊到 ServiceManager 後，此方法會被呼叫。
   * 用於執行服務的初始化邏輯，例如設定事件監聽器。
   */
  init?(): Promise<void> | void;

  /**
   * 當應用程式準備關閉時，此方法會被呼叫。
   * 用於執行清理工作，例如斷開資料庫連線或儲存狀態。
   */
  shutdown?(): Promise<void> | void;
}
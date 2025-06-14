// 檔案: packages/core/src/events/event-bus.ts
// 描述: 提供一個類型安全的事件總線機制。

/**
 * 定義一個監聽器的類型。它是一個接收特定類型 payload 的函式。
 */
export type Listener<T> = (payload: T) => void;

/**
 * EventBus 是一個通用的、類型安全的事件發布/訂閱系統。
 * 它本身不知道任何具體的事件，而是透過泛型 `TEventMap` 來定義事件及其 payload。
 */
export class EventBus<TEventMap extends Record<string, any>> {
  // 使用一個物件來儲存所有事件的監聽器陣列
  private listeners: { [K in keyof TEventMap]?: Listener<TEventMap[K]>[] } = {};

  /**
   * 訂閱一個事件。
   * @param eventName - 要訂閱的事件名稱。
   * @param listener - 事件觸發時要執行的回呼函式。
   */
  public on<K extends keyof TEventMap>(eventName: K, listener: Listener<TEventMap[K]>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName]!.push(listener);
  }

  /**
   * 取消訂閱一個事件。
   * @param eventName - 要取消訂閱的事件名稱。
   * @param listener - 當初傳入 on 方法的同一個回呼函式。
   */
  public off<K extends keyof TEventMap>(eventName: K, listener: Listener<TEventMap[K]>): void {
    if (!this.listeners[eventName]) {
      return;
    }
    const index = this.listeners[eventName]!.indexOf(listener);
    if (index > -1) {
      this.listeners[eventName]!.splice(index, 1);
    }
  }

  /**
   * 發布（觸發）一個事件。
   * 所有訂閱了此事件的監聽器都將被依序呼叫。
   * @param eventName - 要發布的事件名稱。
   * @param payload - 要傳遞給監聽器的數據。
   */
  public emit<K extends keyof TEventMap>(eventName: K, payload: TEventMap[K]): void {
    if (!this.listeners[eventName]) {
      return;
    }
    // 建立一個監聽器陣列的副本，以防在遍歷過程中監聽器被修改
    [...this.listeners[eventName]!].forEach((listener) => {
      try {
        listener(payload);
      } catch (error) {
        console.error(`Error in event listener for ${String(eventName)}:`, error);
      }
    });
  }
}
// 檔案: packages/core/src/services/service-manager.ts
// 描述: 服務管理器的實作，結合了 Singleton 和 Service Locator 模式。

import type { Service } from './service';

/**
 * ServiceManager 是一個單例的服務定位器。
 * 它負責註冊、管理和提供對整個應用程式中所有服務的訪問。
 */
export class ServiceManager {
  // 保存 ServiceManager 的唯一實例 (Singleton 模式)
  private static instance: ServiceManager;

  // 使用 Map 來儲存已註冊的服務
  private services: Map<string, Service> = new Map();

  // 私有化建構函式，防止外部直接 new
  private constructor() {}

  /**
   * 獲取 ServiceManager 的唯一實例。
   * @returns ServiceManager 的單例。
   */
  public static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }
    return ServiceManager.instance;
  }

  /**
   * 註冊一個服務。
   * 如果同名服務已存在，將會拋出錯誤。
   * 註冊後，會自動呼叫服務的 init 方法（如果存在）。
   * @param service - 要註冊的服務實例。
   */
  public async register(service: Service): Promise<void> {
    const serviceName = service.name;
    if (this.services.has(serviceName)) {
      console.warn(`[ServiceManager] Service "${serviceName}" is already registered.`);
      return;
    }

    this.services.set(serviceName, service);
    console.log(`[ServiceManager] Service "${serviceName}" registered.`);

    // 執行服務的初始化生命週期方法
    if (service.init) {
      try {
        await service.init();
        console.log(`[ServiceManager] Service "${serviceName}" initialized.`);
      } catch (error) {
        console.error(`[ServiceManager] Error initializing service "${serviceName}":`, error);
      }
    }
  }

  /**
   * 根據名稱獲取一個已註冊的服務。
   * @param serviceName - 服務的唯一名稱。
   * @returns 服務的實例，如果不存在則返回 undefined。
   */
  public get<T extends Service>(serviceName: string): T | undefined {
    return this.services.get(serviceName) as T | undefined;
  }

  /**

   * 執行所有已註冊服務的關閉生命週期方法。
   * 應在應用程式準備退出時呼叫。
   */
  public async shutdownAll(): Promise<void> {
    console.log('[ServiceManager] Shutting down all services...');
    for (const [name, service] of this.services) {
      if (service.shutdown) {
        try {
          await service.shutdown();
          console.log(`[ServiceManager] Service "${name}" shut down.`);
        } catch (error) {
          console.error(`[ServiceManager] Error shutting down service "${name}":`, error);
        }
      }
    }
    this.services.clear();
    console.log('[ServiceManager] All services have been shut down.');
  }
}
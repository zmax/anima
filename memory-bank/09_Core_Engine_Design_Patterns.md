# 核心引擎設計模式 (Core Engine Design Patterns)

本文件闡述了 `@anima/core` 引擎中，特別是 `ServiceManager`（服務管理器）所採用的核心設計模式。

## 1. Singleton (單例模式)

- **角色**: 應用於 `ServiceManager` 本身。
    
- **目的**: 確保在整個應用程式的生命週期中，`ServiceManager` 只有**一個實例**，提供唯一的全域訪問點。
    

## 2. Service Locator (服務定位器模式)

- **角色**: `ServiceManager` 的主要工作模式。
    
- **目的**: 提供一個中央註冊表，用於解耦服務的「消費者」和「提供者」。
    
- **核心功能**: `register(service)` 和 `get(serviceType)`。
    

## 3. Dependency Injection (依賴注入)

- **角色**: 應用於**被管理的服務本身**的設計原則。
    
- **目的**: 使服務的依賴關係變得明確，並極大地提高其可測試性。
    
- **核心思想**: 服務不應在內部創建依賴，而應在其**建構函式 (constructor)** 中接收這些依賴。
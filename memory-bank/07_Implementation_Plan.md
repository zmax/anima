# 實作步驟規劃與待辦清單 (Implementation Plan & Todo List)

本文件是我們將 Anima 框架從設計藍圖變為現實的開發路線圖。我們將分階段進行，確保每個步驟的基礎都穩固可靠。

## 階段一：核心地基 (`core` & `shared` 套件) - ✅ 完成

- `[x]` **專案初始化**：建立 Monorepo 工作區。    
- `[x]` **共享類型定義 (`shared`)**：建立所有核心的 TypeScript `interface` 定義。    
- `[x]` **基礎物件實作 (`core`)**：建立一個 `BaseGameObject` 類別。    
- `[x]` **事件系統 (`core`)**：實作一個通用的、類型安全的**事件總線 (Event Bus)**。    
- `[x]` **服務管理器 (`core`)**：設計並實作 `Service` 介面與 `ServiceManager`。
    

## 階段二：遊戲伺服器啟動 (`game-server` 套件)

- `[ ]` **伺服器基礎**：設定 Node.js 與 TypeScript 環境，建立主啟動檔案 `main.ts`。
    
- `[ ]` **網路層實作**：整合 `ws` (WebSocket) 套件，並建立 `PlayerConnection` 類別。
    
- `[ ]` **狀態管理整合**：建立一個基礎的 `StateManager`，負責連接到 Redis。
    
- `[ ]` **遊戲主循環 (Game Loop)**：建立 `setInterval` 作為主遊戲循環。
    

## 階段三：第一個互動的實現

- `[ ]` **指令解析器 (`game-server`)**：實作一個基礎的 `CommandParser`。
    
- `[ ]` **實現 `look` 指令**：打通第一個完整的 Read 操作。
    
- `[ ]` **實現 `go` 指令**：打通第一個完整的 Write 操作。
    
- `[ ]` **實現 `updateActions`機制**：實現動態動作更新。
    

## 階段四：前端介面 (`web` 套件)

- `[ ]` **Next.js 專案設定**：初始化 Next.js 專案。
    
- `[ ]` **終端機 UI 組件**：建立基礎的 React 組件。
    
- `[ ]` **WebSocket 客戶端**：實作客戶端的 WebSocket 邏輯。
    

## 階段五：進階框架功能

- `[ ]` **藍圖與工廠模式**：實作 `BlueprintManager`。
    
- `[ ]` **Mixin 與組合模式的實現**：應用到具體的物件創建流程。
    
- `[ ]` **持久化整合**：整合 PostgreSQL 等資料庫。
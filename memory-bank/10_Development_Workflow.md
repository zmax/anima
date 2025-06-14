# 開發工作流程 (Development Workflow)

本文件記錄了在 Anima Monorepo 專案中進行日常開發的最佳實踐與指令。

## 同時啟動多個服務

我們使用 `concurrently` 工具來並行執行 `game-server` 和 `web`。

**統一啟動指令** (在專案根目錄執行):

```
pnpm dev
```

**根目錄 `package.json` 配置範例**:

```
{
  "scripts": {
    "dev": "concurrently \"pnpm --filter @anima/game-server dev\" \"pnpm --filter @anima/web dev\""
  }
}
```

## TypeScript 專案引用

為了讓 TypeScript 和程式碼編輯器能正確理解套件間的依賴關係，我們使用 **TypeScript Project References**。

**關鍵設定**:

1. 在**專案根目錄**下有一個 `tsconfig.json`，其中 `references` 陣列指向所有 packages。
    
2. 在每個**子套件**的 `tsconfig.json` 中，使用 `references` 陣列指向它所依賴的其他本地套件。
    
3. 確保所有子套件的 `tsconfig.json` 中都包含 `"composite": true`。
    

## 開發環境與 Docker

為了確保所有開發者都擁有一個**一致、乾淨且易於啟動**的開發環境，我們決定採用 **Docker** 來管理專案的外部依賴（如 PostgreSQL, Redis）。

- **引入時機**: 此方案將在**階段二**，當 `game-server` 首次需要連接外部服務（如 Redis）時正式引入。
    
- **管理方式**: 使用專案根目錄下的 `docker-compose.yml` 檔案來統一編排所有服務容器。
    
- **目標**: 實現**一鍵啟動**整個專案所需的所有後端服務，簡化新成員的上手流程，並最大化地確保開發與生產環境的一致性。
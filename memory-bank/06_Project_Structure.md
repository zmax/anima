# 專案結構設計 (Project Structure)

本專案採用一個 **Monorepo** 結構來統一管理後端遊戲伺服器與前端 Next.js 應用，確保了程式碼的模組化、可重用性與類型一致性。

## 頂層目錄結構

```
/
├── packages/
│   ├── core/           # 核心引擎 (原 framework)
│   ├── game-server/    # 後端 WebSocket 遊戲伺服器
│   ├── web/            # 前端 Next.js 應用
│   └── shared/         # 前後端共享程式碼
│
├── memory-bank/        # 設計文件
└── package.json        # Monorepo 根配置
```

## 各模組職責 (`/packages/*`)

- **`core` (核心引擎)**: 提供最通用、與具體遊戲內容無關的核心機制。
    
- **`game-server` (遊戲伺服器)**: 獨立的 Node.js 應用，作為 MUD 的即時後端。
    
- **`web` (前端應用)**: 一個 Next.js 應用。
    
- **`shared` (共享程式碼)**: 存放需要被 `game-server` 和 `web` 同時使用的程式碼，主要是 TypeScript 類型定義。
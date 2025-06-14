# 動態動作系統 (Action System)

本系統受 LPMud 經典設計啟發，實現一個去中心化、由環境和物件自身提供互動選項的機制。

## 核心概念

- **Action**: 一個潛在的指令，包含 `verb` (動詞)、`provider` (動作提供者) 和 `execute` (執行函式)。
    
- **Action Provider**: 任何可以賦予 `LivingObject` 新動作的物件，如房間、道具、NPC等。
    
- **Action Set**: 每個 `LivingObject` 身上的一個即時、動態的可用動作列表（快取）。
    

## 核心機制: `updateActions()`

此函式在任何可能影響可用動作的事件（如移動、撿/丟物品）後被觸發。

**執行流程:**

1. **清空舊動作集**。
    
2. **加入內建基礎動作** (`look`, `go`, `get` 等)。
    
3. **掃描環境**: 獲取當前 `Room` 物件及其內部所有 `GameObject` 提供的 `Action`。
    
4. **掃描自身**: 獲取 `LivingObject` 物品欄中所有 `Item` 提供的 `Action`。
    
5. 將所有獲取的 `Action` 加入到 `Action Set` 中。
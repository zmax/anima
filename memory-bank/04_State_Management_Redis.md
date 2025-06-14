# 狀態管理與 Redis 設計 (State Management & Redis Design)

我們使用 Redis 作為線上世界的「熱」資料庫，管理所有活躍狀態，以獲取極致的性能。

## Key 命名原則

- 使用 `:` 作為命名空間分隔符 (e.g., `obj:instanceId`)。
    
- Key 的名稱應清晰、一致、且基於不變的ID (`instanceId`, `connectionId`)。
    

## 核心數據結構設計

|用途|Redis 數據結構|Key 格式|範例|
|---|---|---|---|
|**遊戲物件屬性**|`HASH`|`obj:{instanceId}`|`obj:char_aragorn_inst_1`|
|**容器物品欄**|`SET`|`{type}:{id}:inventory`|`room:town_square_inst_1:inventory`|
|**連線-角色映射**|`STRING`|`conn:{connId}:characterId`|`conn:ws_abc123:characterId`|
|**物件位置反查**|`STRING`|`loc:{instanceId}`|`loc:item_sword_inst_2`|
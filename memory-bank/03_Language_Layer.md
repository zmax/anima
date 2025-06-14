# 語言層 (Language Layer)

語言層負責將玩家輸入的自然語言字串，轉化為系統可執行的指令。它由兩個主要部分組成。

## 組件一: 指令解析 (Command Parsing)

- **職責**: 語法分析。理解句子的**結構**，但不關心詞語的具體意義。
    
- **輸入**: `"put the red apple in the box"`
    
- **輸出**: 一個結構化的指令意圖物件。
    
    ```
    {
      "verb": "put",
      "directObjectString": "the red apple",
      "indirectObjectString": "the box"
    }
    ```
    

## 組件二: 物件解析 (Object Resolution)

- **職責**: 語意分析。將指令中的**文字描述**連結到遊戲世界中**具體的物件實例**。
    
- **輸入**: 上一步產生的指令意圖物件，以及執行者 (`actor`) 的上下文（所在房間和自身物品欄）。
    
- **處理**: 比對 `GameObject` 的 `aliases` 列表來尋找物件。
    
- **輸出**: 一個包含真實 `GameObject` 引用的、可被執行的指令。
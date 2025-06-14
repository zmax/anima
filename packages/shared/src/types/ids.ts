// 檔案: packages/shared/src/types/ids.ts
// 描述: 定義了整個應用中使用的各種唯一標識符類型。

/**
 * 藍圖 ID：代表一個物件的「類型」或「模板」。
 * 由開發者定義，穩定不變。
 * @example 'item:weapon:longsword'
 */
export type BlueprintId = string;

/**
 * 實例 ID：代表一個「具體的、唯一的實例」。
 * 由系統在執行期使用 uuid 等方式生成。
 * @example 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8'
 */
export type InstanceId = string;

/**
 * 連線 ID：代表一個唯一的客戶端 WebSocket 連線。
 */
export type ConnectionId = string;
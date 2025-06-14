import { ConnectionId } from '@anima/shared';
import { generateUuid } from '@anima/utils';
import { WebSocket } from 'ws';

/**
 * PlayerConnection 代表一個連接到伺服器的玩家客戶端（靈魂）。
 * 它封裝了 WebSocket 連線，並負責處理與該玩家的直接通訊。
 */
export class PlayerConnection {
	public readonly id: ConnectionId;
	private readonly ws: WebSocket;

	constructor(ws: WebSocket) {
		this.id = generateUuid();
		this.ws = ws;

		this.setupListeners();
	}

	/**
	 * 設定此連線的事件監聽器。
	 */
	private setupListeners(): void {
		this.ws.on('message', (data: Buffer) => {
			const message = data.toString();
			// TODO: 將訊息傳遞給指令解析器
			console.log(`[Connection ${this.id}] Received: ${message}`);
			this.send(`You said: ${message}`);
});

		this.ws.on('close', () => {
			// TODO: 觸發 'connection:closed' 事件，讓系統處理玩家離線邏輯
			console.log(`[Connection ${this.id}] Connection closed.`);
		});

		this.ws.on('error', error => {
			console.error(`[Connection ${this.id}] WebSocket error:`, error);
		});
	}

	/**
	 * 向此玩家的客戶端發送一則訊息。
	 * @param message - 要發送的文字訊息。
	 */
	public send(message: string): void {
		if (this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(message);
		}
	}

	/**
	 * 關閉此連線。
	 */
	public disconnect(): void {
		this.ws.close();
	}
}

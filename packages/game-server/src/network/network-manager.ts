import { WebSocketServer, WebSocket } from 'ws';
import { PlayerConnection } from './player-connection';
import { Service } from '@anima/core';
import { ConnectionId } from '@anima/shared';

/**
 * NetworkManager 是一個服務，負責管理 WebSocket 伺服器和所有玩家的連線。
 */
export class NetworkManager implements Service {
	public readonly name = 'network';
	private wss!: WebSocketServer;
	private connections: Map<ConnectionId, PlayerConnection> = new Map();

	// 依賴注入：接收伺服器監聽的埠號
	constructor(private readonly port: number) {}

	/**
	 * 初始化並啟動 WebSocket 伺服器。
	 */
	public init(): void {
		this.wss = new WebSocketServer({ port: this.port });

		this.wss.on('listening', () => {
			console.log(
				`[NetworkManager] WebSocket server listening on port ${this.port}`
			);
		});

		this.wss.on('connection', (ws: WebSocket) => {
			console.log('[NetworkManager] A client connected.');
			const connection = new PlayerConnection(ws);
			this.connections.set(connection.id, connection);

			// TODO: 觸發 'connection:opened' 事件，開始玩家登入/認證流程
			connection.send('歡迎來到 Anima MUD 框架！');
		});
	}

	/**
	 * 當伺服器關閉時，斷開所有連線。
	 */
	public shutdown(): void {
		console.log('[NetworkManager] Shutting down network manager...');
		for (const connection of this.connections.values()) {
			connection.disconnect();
		}
		this.wss.close();
		console.log('[NetworkManager] All connections closed.');
	}
}

import { Service } from '@anima/core';
import Redis, { Redis as RedisClient } from 'ioredis';

/**
 * StateManager 是一個服務，負責管理與 Redis 的所有互動。
 * 它是遊戲世界狀態的存取點。
 */
export class StateManager implements Service {
	public readonly name = 'state';
	private client!: RedisClient;

	// 依賴注入：接收 Redis 的連線 URL
	constructor(private readonly redisUrl: string) {}

	/**
	 * 初始化並連接到 Redis 伺服器。
	 */
	public async init(): Promise<void> {
		this.client = new Redis(this.redisUrl);

		return new Promise((resolve, reject) => {
			this.client.on('connect', () => {
				console.log('[StateManager] Successfully connected to Redis.');
				resolve();
			});

			this.client.on('error', error => {
				console.error('[StateManager] Could not connect to Redis:', error);
				reject(error);
			});
		});
	}

	/**
	 * 當伺服器關閉時，斷開與 Redis 的連線。
	 */
	public async shutdown(): Promise<void> {
		await this.client.quit();
		console.log('[StateManager] Disconnected from Redis.');
	}

	// TODO: 在此處新增更多與 Redis 互動的方法，例如：
	// public async getObject(id: InstanceId): Promise<GameObjectData | null> { ... }
	// public async setObject(id: InstanceId, data: GameObjectData): Promise<void> { ... }
	// public async moveObject(...) { ... }
}

import { ServiceManager, EventBus, CoreEvents } from '@anima/core';
import { NetworkManager } from './network/network-manager';
import { StateManager } from './services/state-manager';

class GameServer {
	private serviceManager: ServiceManager;
	private eventBus: EventBus<CoreEvents>;
	private gameLoopId?: NodeJS.Timeout;
	private lastTickTime: number = 0;

	constructor() {
		console.log('[Anima] Initializing Game Server...');
		this.serviceManager = ServiceManager.getInstance();
		// 創建一個符合核心事件定義的 EventBus 實例
		this.eventBus = new EventBus<CoreEvents>();
	}

	public async start(): Promise<void> {
		// TODO: 這裡未來會從 .env 和 config.yaml 載入
		const config = {
			server: {
				port: 4000,
				tickRate: 20, // 每秒的遊戲主循環次數
			},
			redis: {
				url: 'redis://localhost:6379',
			},
		};

		// 註冊核心服務
		// TODO: 未來將 eventBus 透過依賴注入傳入服務
		await this.serviceManager.register(new NetworkManager(config.server.port));
		await this.serviceManager.register(new StateManager(config.redis.url));

		// 啟動遊戲主循環
		this.startGameLoop(config.server.tickRate);

		console.log('[Anima] Game Server started successfully.');
		console.log('-----------------------------------------');
	}

	public async stop(): Promise<void> {
		console.log('\n[Anima] Shutting down Game Server...');
		this.stopGameLoop();
		await this.serviceManager.shutdownAll();
		console.log('[Anima] Game Server has been shut down. Goodbye!');
		process.exit(0);
	}

	/**
	 * 啟動遊戲主循環。
	 * @param tickRate - 每秒的 tick 次數。
	 */
	private startGameLoop(tickRate: number): void {
		const tickInterval = 1000 / tickRate;
		this.lastTickTime = Date.now();

		this.gameLoopId = setInterval(() => {
			const currentTime = Date.now();
			const deltaTime = currentTime - this.lastTickTime;
			this.lastTickTime = currentTime;

			// 廣播核心 tick 事件
			this.eventBus.emit('core:tick', {
				timestamp: currentTime,
				deltaTime: deltaTime,
			});
		}, tickInterval);

		console.log(`[GameServer] Game loop started with a tick rate of ${tickRate}Hz.`);
	}

	/**
	 * 停止遊戲主循環。
	 */
	private stopGameLoop(): void {
		if (this.gameLoopId) {
			clearInterval(this.gameLoopId);
			console.log('[GameServer] Game loop stopped.');
		}
	}
}

const server = new GameServer();
server.start();

// 優雅地處理關閉信號
process.on('SIGINT', () => server.stop());
process.on('SIGTERM', () => server.stop());

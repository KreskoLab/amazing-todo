import { defineStore } from 'pinia';
import type { Todo, WsResponse } from '@/types';

interface StoreState {
	todos: Todo[];
	socket: WebSocket | null;
}

export const useTodosStore = defineStore('todos', {
	state: (): StoreState => ({
		todos: [],
		socket: null,
	}),
	getters: {
		completed: (state) => state.todos.filter((todo) => todo.completed),
		pending: (state) => state.todos.filter((todo) => !todo.completed),
	},
	actions: {
		async fetch() {
			try {
				const response = await fetch(`${import.meta.env.VITE_API}/todos`);

				this.todos = (await response.json()) as Todo[];
				this.todos.sort(
					(a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
				);
			} catch (error) {
				this.todos = [];
			}
		},

		openWS() {
			this.socket = new WebSocket(import.meta.env.VITE_WS);

			this.socket.onmessage = (message: MessageEvent) => {
				const { data, event } = JSON.parse(message.data) as WsResponse;

				switch (event) {
					case 'add':
						this.todos.push(data);
						break;

					case 'update':
						const index = this.todos.findIndex((todo) => todo._id === data._id);
						this.todos[index] = data;
						break;

					case 'remove':
						this.todos = this.todos.filter((todo) => todo._id !== data._id);
						break;
				}
			};
		},

		closeWS() {
			this.socket?.close(1000);
			this.socket = null;
		},

		async add(title: Todo['title']) {
			this.socket?.send(
				JSON.stringify({
					event: 'add-todo',
					data: {
						title,
					},
				}),
			);
		},

		async update(id: string, payload: Partial<Omit<Todo, '_id' | 'updatedAt'>>) {
			this.socket?.send(
				JSON.stringify({
					event: 'update-todo',
					data: {
						id,
						...payload,
					},
				}),
			);
		},

		async remove(id: string) {
			this.socket?.send(
				JSON.stringify({
					event: 'remove-todo',
					data: {
						id,
					},
				}),
			);
		},
	},
});

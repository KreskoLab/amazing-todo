import { defineStore } from 'pinia';
import type { Todo } from '@/types';

interface StoreState {
	todos: Todo[];
}

export const useTodosStore = defineStore('todos', {
	state: (): StoreState => ({
		todos: [],
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
				console.log(error);
			}
		},

		async add(title: Todo['title']) {
			try {
				const response = await fetch(`${import.meta.env.VITE_API}/todos`, {
					method: 'POST',
					body: JSON.stringify({ title }),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}

				const todo = (await response.json()) as Todo;
				this.todos.unshift(todo);
			} catch (error) {
				console.log(error);
			}
		},

		async update(id: string, payload: Partial<Omit<Todo, '_id' | 'updatedAt'>>) {
			try {
				const response = await fetch(`${import.meta.env.VITE_API}/todos/${id}`, {
					method: 'PUT',
					body: JSON.stringify(payload),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}

				const todo = (await response.json()) as Todo;
				const oldTodo = this.todos.findIndex((todo) => todo._id === id);

				this.todos[oldTodo] = todo;
			} catch (error) {
				console.log(error);
			}
		},

		async remove(id: string) {
			try {
				const response = await fetch(`${import.meta.env.VITE_API}/todos/${id}`, {
					method: 'DELETE',
				});

				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}

				this.todos = this.todos.filter((todo) => todo._id !== id);
			} catch (error) {
				console.log(error);
			}
		},
	},
});

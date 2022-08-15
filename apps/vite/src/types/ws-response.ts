import { EVENT } from '@/enums/event';
import { Todo } from './todo';

export type WsResponse = {
	event: `${EVENT}`;
	data: Todo;
};

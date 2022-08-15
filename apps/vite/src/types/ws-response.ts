import { EVENT } from 'miscs';
import { Todo } from './todo';

export type WsResponse = {
	event: `${EVENT}`;
	data: Todo;
};

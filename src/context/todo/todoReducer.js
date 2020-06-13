import { ADD_TODO, EDIT_TODO, DELETE_TODO, SHOW_LOADER, HIDE_LOADER, CLEAR_ERROR, SHOW_ERROR, FETCH_TODOS } from '../types';

const handlers = {
	[ADD_TODO]: (state, { title, id }) => ({
		...state,
		todos: [ ...state.todos, { id, title } ]
	}),

	[EDIT_TODO]: (state, { id, title }) => ({
		...state,
		todos: state.todos.map((todo) => {
			if (todo.id === id) todo.title = title;
			return todo;
		})
	}),

	[DELETE_TODO]: (state, { id }) => ({
		...state,
		todos: state.todos.filter((item) => item.id !== id)
	}),

	[SHOW_LOADER]: (state) => ({ ...state, loading: true }),
	[HIDE_LOADER]: (state) => ({ ...state, loading: false }),

	[CLEAR_ERROR]: (state) => ({ ...state, error: null }),
	[SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
	[FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),

	DEFAULT: (state) => state
};

const todoReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action)
};

export default todoReducer;

import React, { useReducer, useContext, useCallback } from 'react';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import {
	ADD_TODO,
	EDIT_TODO,
	DELETE_TODO,
	SHOW_LOADER,
	HIDE_LOADER,
	SHOW_ERROR,
	CLEAR_ERROR,
	FETCH_TODOS
} from '../types';
import ScreenContext from '../screen/screenContext';
import { Platform } from 'react-native';

const TodoState = ({ children }) => {
	const initialState = {
		todos: [],
		loading: false,
		error: null
	};

	const { changeScreen } = useContext(ScreenContext);

	const [state, dispatch] = useReducer(todoReducer, initialState);

	const addTodo = async (title) => {
		const response = await fetch('https://rn-todo-app-f1f4c.firebaseio.com/todos.json', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title })
		});

		const data = await response.json();

		dispatch({ type: ADD_TODO, title, id: data.name });
	};

  const deleteTodo = async (id) => {
    
    clearError();

    try {
     await fetch(`https://rn-todo-app-f1f4c.firebaseio.com/todos/${id}.json`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});
      changeScreen(null);
		  dispatch({ type: DELETE_TODO, id });
    } catch (error) {
        showError('Что-то пошло не так...');
				console.log(error);
    }
	};

	const fetchTodos = async () => {
		showLoader();
		clearError();

		try {
			const response = await fetch('https://rn-todo-app-f1f4c.firebaseio.com/todos.json', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			console.log(data);
			const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
			dispatch({ type: FETCH_TODOS, todos });
		} catch (error) {
			showError('Что-то пошло не так...');
			console.log(error);
		} finally {
			hideLoader();
		}
	};

  const editTodo = async (id, title) => {
    clearError();
    
    try {
      await fetch(`https://rn-todo-app-f1f4c.firebaseio.com/todos/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title})
      });
      dispatch({ type: EDIT_TODO, id, title });
    } catch (error) {
        showError('Что-то пошло не так...');
				console.log(error);
    }
	};

	const showLoader = () => dispatch({ type: SHOW_LOADER });

	const hideLoader = () => dispatch({ type: HIDE_LOADER });

	const showError = (error) => dispatch({ type: SHOW_ERROR, error });

	const clearError = () => dispatch({ type: CLEAR_ERROR });

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				loading: state.loading,
				error: state.error,
				addTodo,
				deleteTodo,
				editTodo,
				fetchTodos
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoState;

import React, { useContext, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import AddTodo from '../components/AddTodo';
import TodoItem from '../components/TodoItem';
import AppTextBold from '../components/UI/AppTextBold';
import AppText from '../components/UI/AppText';
import TodoContext from '../context/todo/todoContext';
import ScreenContext from '../context/screen/screenContext';
import AppLoader from '../components/UI/AppLoader';
import THEME from '../theme';
import AppButton from '../components/UI/AppButton';

const MainScreen = () => {
	const { addTodo, todos, deleteTodo, fetchTodos, loading, error } = useContext(TodoContext);
	const { changeScreen } = useContext(ScreenContext);


	const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

	useEffect(() => {
		loadTodos();
	}, [])

	if (loading) {
		return <AppLoader />
	}

	if (error) {
		return (
			<View style={styles.center}>
				<AppText style={styles.error}>{error}</AppText>
				<AppButton onPress={loadTodos} title="Повторить" />
			</View>
		)
	}

	let content = (
		<FlatList
			style={styles.containerFlat}
			data={todos}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => <TodoItem todoItem={item} deleteTodo={deleteTodo} onOpen={changeScreen} />}
		/>
	);

	if (todos.length === 0) {
		content = (
			<View style={styles.imgWrap}>
				<Image style={styles.image} source={require('../../assets/no-items.png')} />
				<View style={styles.imageTitle}>
					<AppTextBold>Список Todo пустой :'(</AppTextBold>
				</View>
			</View>
		);
	}

	return (
		<View>
			<AddTodo addTodo={addTodo} />
			{content}
		</View>
	);
};

const styles = StyleSheet.create({
	containerFlat: {
		marginTop: 20,
		paddingHorizontal: 20,
		backgroundColor: '#3498db',
		width: '100%'
	},

	imgWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: Dimensions.get('window').height - 200
	},

	image: {
		width: '50%',
		height: '50%',
		resizeMode: 'contain'
	},

	imageTitle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},

	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	error: {
		fontSize: 20,
		color: THEME.DANGER_COLOR,
	}
});

export default MainScreen;

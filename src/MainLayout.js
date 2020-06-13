import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Navbar from './components/Navbar';
import MainScreen from './screens/MainScreen';
import TodoScreen from './screens/TodoScreen';
import TodoContext from './context/todo/todoContext';
import ScreenContext from './context/screen/screenContext';

const MainLayout = () => {
	const { todoId } = useContext(ScreenContext);

	return (
		<View style={styles.wrapper}>
			<Navbar title="Todo App" />
			<View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
	wrapper: {
		flex: 1
	}
});

export default MainLayout;

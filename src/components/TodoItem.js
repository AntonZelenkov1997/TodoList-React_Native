import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const TodoItem = ({ todoItem, deleteTodo, onOpen }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={() => onOpen(todoItem.id)}
			onLongPress={async () => await deleteTodo(todoItem.id)}
		>
			<View style={styles.todoItem} key={Date.now().toString()}>
				<Text style={styles.text}>{todoItem.id}</Text>
				<Text style={styles.text}>{todoItem.title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	todoItem: {
		paddingVertical: 10,
		marginTop: 10,
		marginBottom: 10,
		justifyContent: 'space-between',
		flexDirection: 'row',
		backgroundColor: '#2980b9'
	},

	text: {
		textAlign: 'center',
		width: '50%',
		color: 'white',
		fontFamily: 'sans-serif',
		letterSpacing: 1.4
	}
});

export default TodoItem;
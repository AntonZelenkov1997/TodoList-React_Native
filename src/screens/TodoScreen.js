import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {FontAwesome, AntDesign } from '@expo/vector-icons';
import THEME from '../theme';
import EditModal from '../components/EditModal';
import AppButton from '../components/UI/AppButton';
import TodoContext from '../context/todo/todoContext';
import ScreenContext from '../context/screen/screenContext';

const TodoScreen = () => {
	const { todos, deleteTodo, editTodo } = useContext(TodoContext);
	const {todoId, changeScreen} = useContext(ScreenContext);
	const [modal, setModal] = useState(false);

	const todo = todos.find(t => t.id === todoId);

	return (
		<View style={styles.container}>
			<EditModal
				todoInfo={todo}
				visible={modal}
				goBack={changeScreen}
				closeModal={() => setModal(false)}
				editTodo={editTodo}
			/>
			<View style={styles.cardTitle}>
				<View style={styles.cardTitleWrapper}>
					<Text style={styles.cardTitleText}>{todo.title}</Text>
				</View>
				<TouchableOpacity activeOpacity={0.7} style={styles.editButton} onPress={() => setModal(true)}>
					{/* <Text style={styles.editButtonText}>Ред.</Text> */}
					<FontAwesome name="edit" size={20} color="#fff" />
				</TouchableOpacity>
			</View>
			<View style={styles.buttons}>
				<View style={styles.button}>
					{/* <Button title="Назад" onPress={toMainScreen} color={THEME.GRAY_COLOR} /> */}
					<AppButton
						title="Назад"
						onPress={() => {
							changeScreen(null);
						}}
						color={THEME.GRAY_COLOR}
					/>
				</View>

				<View style={styles.button}>
					{/* <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={deleteTodo} /> */}
					<AppButton
						title="Удалить"
						onPress={async () => await deleteTodo(todoId)}
						color={THEME.DANGER_COLOR}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: Dimensions.get('window').height - 70,
		paddingHorizontal: 20
	},

	cardTitle: {
		borderColor: THEME.BORDER_COLOR,
		borderStyle: 'solid',
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		justifyContent: 'space-between',
		flexDirection: 'row'
	},

	cardTitleWrapper: {
		backgroundColor: THEME.MAIN_COLOR,
		justifyContent: 'center',
		alignItems: 'center',
		width: '70%'
	},

	cardTitleText: {
		fontFamily: 'montserrat-regular'
	},

	editButton: {
		backgroundColor: THEME.PRIMARY_COLOR,
		paddingHorizontal: 20,
		paddingVertical: 12,
		justifyContent: 'center',
		alignItems: 'center',
		width: '30%'
	},

	editButtonText: {
		color: '#fff',
		fontFamily: 'montserrat-regular'
	},

	buttons: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	button: {
		// width: '40%'
		width: Dimensions.get('window').width / 3
	}
});


export default TodoScreen;
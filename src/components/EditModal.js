import React, { useState, useContext } from 'react';
import { View, Modal, StyleSheet, Button, TextInput, Alert } from 'react-native';
import THEME from '../theme';
import ScreenContext from '../context/screen/screenContext';

const EditModal = ({ visible, goBack, todoInfo, editTodo, closeModal }) => {
	const [inputTextValue, setInputTextValue] = useState(todoInfo.title);
	const { todoId, changeScreen } = useContext(ScreenContext);

	return (
		<Modal visible={visible} style={styles.modal} animationType="slide">
			<View style={styles.container}>
				<TextInput
					style={styles.textInput}
					defaultValue={todoInfo.title}
					onChangeText={(text) => setInputTextValue(text)}
					placeholder="Введите название todo"
				/>
				<View style={styles.buttons}>
					<View style={styles.button}>
						<Button color={THEME.GRAY_COLOR} onPress={closeModal} title="Отменить" />
					</View>
					<View style={styles.button}>
						<Button
							title="Сохранить"
							onPress={async () => {
								if (inputTextValue.trim()) {
									await editTodo(todoInfo.id, inputTextValue);
									goBack();
								} else Alert.alert('Некорректное название Todo.\nПопробуйте снова');
							}}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 12
	},

	textInput: {
		borderBottomColor: THEME.BORDER_COLOR,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		width: '100%',
		fontFamily: 'montserrat-regular',
		letterSpacing: 1.4
	},

	buttons: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},

	button: {
		width: '30%'
	}
});

export default EditModal;
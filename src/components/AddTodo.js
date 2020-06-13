import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard, Alert } from 'react-native';
import {AntDesign } from '@expo/vector-icons';
import THEME from '../theme';

const AddTodo = ({ addTodo }) => {
	const [textInputValue, setTextInputValue] = useState('');

	return (
		<View style={styles.block}>
			<TextInput
				placeholder="Добавь todo"
				style={styles.textInput}
				onChangeText={(text) => setTextInputValue(text)}
				value={textInputValue}
			/>
			<View style={styles.wrapperButton}>
				<AntDesign.Button
					name="pluscircleo"
					style={styles.button}
					color="white"
					onPress={() => {
						if (textInputValue.trim()) {
							addTodo(textInputValue);
							setTextInputValue('');
							Keyboard.dismiss();
						} else Alert.alert('Некорректное название Todo.\nПопробуйте снова');
					}}
				>
					Добавить
				</AntDesign.Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		marginTop: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20
	},

	textInput: {
		borderBottomColor: THEME.BORDER_COLOR,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		width: '65%',
		fontFamily: 'sans-serif',
		letterSpacing: 1.4
	},

	wrapperButton: {
		width: '30%'
	},

	button: {
		justifyContent: "center",
		alignItems: 'center',
		backgroundColor: '#D24A43'
	}
});

export default AddTodo;
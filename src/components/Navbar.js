import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import THEME from '../theme';

const Navbar = ({ title }) => {
	return (
		<View
			style={{
				...styles.navbar,
				...Platform.select({
					ios: styles.navbarIOS,
					android: styles.navbarAndroid
				})
			}}
		>
      <Text style={{
        ...Platform.select({
          ios: styles.textIOS,
          android: styles.textAndroid
      })}}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	navbar: {
		width: '100%',
		height: 70,
		justifyContent: 'center',
		alignItems: 'center'
	},

	navbarAndroid: {
		backgroundColor: THEME.MAIN_COLOR
	},

	navbarIOS: {
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 1
	},

	textAndroid: {
    color: '#a5a5a5',
    fontSize: 20,
  },
  
  textIOS: {
    color: "#000",
    fontSize: 20,
  }
});

export default Navbar;

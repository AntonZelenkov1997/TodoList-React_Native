import React from 'react';
import { TouchableOpacity, StyleSheet, View, TouchableNativeFeedback, Platform } from 'react-native';
import AppTextBold from './AppTextBold';
import AppText from './AppText';
import AppTextSemiBold from './AppTextSemiBold';
import THEME from '../../theme';

const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR, title }) => {
  const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
  return (
		<Wrapper onPress={onPress} activeOpacity={0.7}>
			<View style={{ ...styles.button, backgroundColor: color }}>
				<AppTextSemiBold style={styles.text}>{title}</AppTextSemiBold>
			</View>
		</Wrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff'
  }
})

export default AppButton;
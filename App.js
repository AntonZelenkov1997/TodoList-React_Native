import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MainLayout from './src/MainLayout';
import TodoState from './src/context/todo/TodoState';


import ScreenState from './src/context/screen/ScreenState';


const loadApplication = async () => {
	await Font.loadAsync({
		'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
		'montserrat-semiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
		'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf')
	});
};

export default function App() {
	const [isReady, setIsReady] = useState(false);


	if (!isReady) {
		return (
			<AppLoading
				startAsync={loadApplication}
				onError={(err) => console.log(err)}
				onFinish={() => setIsReady(true)}
			/>
		)
	}



	return (
		<ScreenState>
			<TodoState>
				<MainLayout />
			</TodoState>
		</ScreenState>
	);
}



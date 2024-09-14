// App.tsx
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieListScreen from './MovieListScreen';
import MovieDetailsScreen from './MovieDetailsScreen';
import {enableScreens} from 'react-native-screens';

enableScreens();

// for stack of screen implementation type of each pages
export type RootStackParamList = {
  MovieList: undefined;
  MovieDetails: {movieId: string};
};

// stack Implementaion
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{title: 'Movies'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{title: 'Movie Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

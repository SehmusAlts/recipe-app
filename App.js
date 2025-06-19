<<<<<<< HEAD
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './contexts/AuthContext';
=======
import React, { useState } from 'react';
import { View } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import MyRecipesScreen from './screens/MyRecipesScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398

const Navigation = () => {
    const { user } = useAuth();
    const [currentScreen, setCurrentScreen] = useState('Home');

    if (!user) {
        return <LoginScreen />;
    }

    const navigate = (screenName) => {
        setCurrentScreen(screenName);
    };

    const goBack = () => {
        setCurrentScreen('Home');
    };

    const navigationProps = {
        navigation: {
            navigate,
            goBack,
            replace: navigate
        }
    };

    switch (currentScreen) {
        case 'Home':
            return <HomeScreen {...navigationProps} />;
        case 'RecipeList':
            return <RecipeListScreen {...navigationProps} />;
        case 'MyRecipes':
            return <MyRecipesScreen {...navigationProps} />;
        case 'Favorites':
            return <FavoritesScreen {...navigationProps} />;
        case 'AddRecipe':
            return <AddRecipeScreen {...navigationProps} />;
        default:
            return <HomeScreen {...navigationProps} />;
    }
};

const App = () => {
    return (
<<<<<<< HEAD
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <AppNavigator />
            </AuthProvider>
        </GestureHandlerRootView>
=======
        <AuthProvider>
            <Navigation />
        </AuthProvider>
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
    );
};

export default App;

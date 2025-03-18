import React, { useState } from 'react';
import { View } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import MyRecipesScreen from './screens/MyRecipesScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';

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
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    );
};

export default App;

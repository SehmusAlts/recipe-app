import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Ekranları içe aktarın
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import LogoutScreen from '../screens/LogoutScreen';
import RecipesScreen from '../screens/RecipesScreen';
import MyRecipesScreen from '../screens/MyRecipesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import RecipeListScreen from '../screens/RecipeListScreen';

// Kimlik doğrulama ekranları için Stack Navigator
const AuthStack = createNativeStackNavigator();
// Ana uygulama ekranları için Stack Navigator
const AppStack = createNativeStackNavigator();
// Kök Stack Navigator
const RootStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Tariflerim' }}
      />
      <AppStack.Screen 
        name="Recipes" 
        component={RecipesScreen} 
        options={{ title: 'Tarifleri Görüntüle' }}
      />
      <AppStack.Screen 
        name="RecipeList" 
        component={RecipeListScreen} 
        options={{ title: 'Yemek Tarifleri' }}
      />
      <AppStack.Screen 
        name="AddRecipe" 
        component={AddRecipeScreen} 
        options={{ title: 'Yeni Tarif' }}
      />
      <AppStack.Screen 
        name="RecipeDetail" 
        component={RecipeDetailScreen} 
        options={{ title: 'Tarif Detayı' }}
      />
      <AppStack.Screen 
        name="MyRecipes" 
        component={MyRecipesScreen} 
        options={{ title: 'Benim Tariflerim' }}
      />
      <AppStack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ title: 'Favoriler' }}
      />
      <AppStack.Screen 
        name="Logout" 
        component={LogoutScreen} 
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <RootStack.Screen name="Auth" component={AuthStackScreen} />
        ) : (
          <RootStack.Screen name="App" component={AppStackScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
} 
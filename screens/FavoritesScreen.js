import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFavorites = async () => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            const recipesData = await AsyncStorage.getItem('recipes');
            
            if (favoritesData && recipesData) {
                const favoriteIds = JSON.parse(favoritesData);
                const allRecipes = JSON.parse(recipesData);
                
                const favoriteRecipes = allRecipes.filter(recipe => 
                    favoriteIds.includes(recipe.id)
                );
                
                setFavorites(favoriteRecipes);
            }
        } catch (error) {
            console.error('Favoriler yüklenirken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleRemoveFavorite = async (recipeId) => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            if (favoritesData) {
                const favoriteIds = JSON.parse(favoritesData);
                const updatedFavorites = favoriteIds.filter(id => id !== recipeId);
                await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                
                setFavorites(prevFavorites => 
                    prevFavorites.filter(recipe => recipe.id !== recipeId)
                );
            }
        } catch (error) {
            console.error('Favori kaldırılırken hata:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <View style={styles.backButtonInner}>
                        <Text style={styles.backButtonArrow}>←</Text>
                        <Text style={styles.backButtonText}>Geri</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Favori Tariflerim</Text>
            </View>

            <ScrollView style={styles.recipeList}>
                {favorites.length === 0 ? (
                    <Text style={styles.noFavorites}>
                        Henüz favori tarifiniz bulunmuyor.
                    </Text>
                ) : (
                    favorites.map(recipe => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                            <Text style={styles.recipeCategory}>{recipe.category}</Text>
                            <Text style={styles.recipeDate}>
                                {new Date(recipe.createdAt).toLocaleDateString('tr-TR')}
                            </Text>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => handleRemoveFavorite(recipe.id)}
                            >
                                <Text style={styles.removeButtonText}>Favorilerden Çıkar</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        marginRight: 16,
    },
    backButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8D6E63',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    backButtonArrow: {
        color: '#fff',
        fontSize: 18,
        marginRight: 4,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    recipeList: {
        flex: 1,
        padding: 16,
    },
    noFavorites: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    recipeCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    recipeCategory: {
        fontSize: 14,
        color: '#666',
    },
    recipeDate: {
        fontSize: 12,
        color: '#666',
    },
    removeButton: {
        padding: 8,
        backgroundColor: '#FF4500',
        borderRadius: 8,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FavoritesScreen;

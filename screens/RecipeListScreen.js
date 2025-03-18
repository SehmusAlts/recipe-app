import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeListScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const loadRecipes = async () => {
        try {
            const recipesData = await AsyncStorage.getItem('recipes');
            if (recipesData) {
                const allRecipes = JSON.parse(recipesData);
                setRecipes(allRecipes);
                const uniqueCategories = [...new Set(allRecipes.map(recipe => recipe.category))];
                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.error('Tarifler yüklenirken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const handleFavorite = async (recipeId) => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            const favoriteIds = favoritesData ? JSON.parse(favoritesData) : [];
            const isFavorite = favoriteIds.includes(recipeId);
            const updatedFavorites = isFavorite ? 
                favoriteIds.filter(id => id !== recipeId) : 
                [...favoriteIds, recipeId];
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Favori güncellenirken hata:', error);
        }
    };

    const handleRate = async (recipeId, rating) => {
        try {
            const ratingsData = await AsyncStorage.getItem('ratings');
            const ratings = ratingsData ? JSON.parse(ratingsData) : {};
            ratings[recipeId] = rating;
            await AsyncStorage.setItem('ratings', JSON.stringify(ratings));
        } catch (error) {
            console.error('Puanlama güncellenirken hata:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const filteredRecipes = selectedCategory ? 
        recipes.filter(recipe => recipe.category === selectedCategory) : 
        recipes;

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
                <Text style={styles.headerTitle}>Tarif Listesi</Text>
            </View>

            <ScrollView horizontal style={styles.categoryList}>
                <TouchableOpacity 
                    style={[styles.categoryButton, !selectedCategory && styles.selectedCategoryButton]} 
                    onPress={() => setSelectedCategory('')}
                >
                    <Text style={styles.categoryButtonText}>Tümü</Text>
                </TouchableOpacity>
                {categories.map(category => (
                    <TouchableOpacity 
                        key={category} 
                        style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]} 
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={styles.categoryButtonText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView style={styles.recipeList}>
                {filteredRecipes.length === 0 ? (
                    <Text style={styles.noRecipes}>
                        Bu kategoride tarif bulunmuyor.
                    </Text>
                ) : (
                    filteredRecipes.map(recipe => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                            <Text style={styles.recipeCategory}>{recipe.category}</Text>
                            <Text style={styles.recipeDate}>
                                {new Date(recipe.createdAt).toLocaleDateString('tr-TR')}
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.favoriteButton}
                                    onPress={() => handleFavorite(recipe.id)}
                                >
                                    <Text style={styles.buttonText}>Favori</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.rateButton}
                                    onPress={() => handleRate(recipe.id, 5)}
                                >
                                    <Text style={styles.buttonText}>Puanla</Text>
                                </TouchableOpacity>
                            </View>
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
    categoryList: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    selectedCategoryButton: {
        backgroundColor: '#8D6E63',
    },
    categoryButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    recipeList: {
        flex: 1,
        padding: 16,
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
        marginBottom: 8,
    },
    recipeDate: {
        fontSize: 12,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    favoriteButton: {
        padding: 8,
        backgroundColor: '#FFD700',
        borderRadius: 8,
    },
    rateButton: {
        padding: 8,
        backgroundColor: '#8D6E63',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    noRecipes: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#666',
    },
});

export default RecipeListScreen;

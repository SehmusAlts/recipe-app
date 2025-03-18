import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyRecipesScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadRecipes = async () => {
        try {
            const recipesData = await AsyncStorage.getItem('recipes');
            if (recipesData) {
                const allRecipes = JSON.parse(recipesData);
                setRecipes(allRecipes);
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

    const handleDeleteRecipe = async (recipeId) => {
        try {
            const recipesData = await AsyncStorage.getItem('recipes');
            if (recipesData) {
                const allRecipes = JSON.parse(recipesData);
                const updatedRecipes = allRecipes.filter(recipe => recipe.id !== recipeId);
                await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));
                setRecipes(updatedRecipes);
            }
        } catch (error) {
            console.error('Tarif silinirken hata:', error);
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
                <Text style={styles.headerTitle}>Tariflerim</Text>
            </View>

            <ScrollView style={styles.recipeList}>
                {recipes.length === 0 ? (
                    <Text style={styles.noRecipes}>
                        Henüz tarif eklemediniz.
                    </Text>
                ) : (
                    recipes.map(recipe => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                            <Text style={styles.recipeCategory}>{recipe.category}</Text>
                            <Text style={styles.recipeDate}>
                                {new Date(recipe.createdAt).toLocaleDateString('tr-TR')}
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => navigation.navigate('EditRecipe', { recipe })}
                                >
                                    <Text style={styles.buttonText}>Düzenle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteRecipe(recipe.id)}
                                >
                                    <Text style={styles.buttonText}>Sil</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('AddRecipe')}
            >
                <Text style={styles.addButtonText}>+ Yeni Tarif Ekle</Text>
            </TouchableOpacity>
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
    noRecipes: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
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
        marginBottom: 8,
    },
    recipeCategory: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    recipeDate: {
        fontSize: 12,
        color: '#999',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    editButton: {
        backgroundColor: '#8D6E63',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: '#ff3b30',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 120,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#8D6E63',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default MyRecipesScreen;

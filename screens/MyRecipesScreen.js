import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
=======
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
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
<<<<<<< HEAD
            <StatusBar backgroundColor="#5D4037" barStyle="light-content" />
            
            {/* Başlık Çubuğu */}
=======
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
            <View style={styles.header}>
                <Text style={styles.headerText}>Yemek Tarif Uygulaması</Text>
            </View>
            
            <View style={styles.subHeader}>
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

<<<<<<< HEAD
            {/* Yeni Tarif Ekleme Butonu */}
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigation.navigate('AddRecipe')}
            >
                <Text style={styles.addButtonText}>Yeni Tarif Ekle</Text>
            </TouchableOpacity>

            {myRecipes.length === 0 ? (
                <Text style={styles.emptyMessage}>Henüz bir tarif eklenmedi.</Text>
            ) : (
                <FlatList
                    data={myRecipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.recipeItem}>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                                style={styles.recipeContent}
                            >
                                <Image source={{ uri: item.image }} style={styles.recipeImage} />
                                <View style={styles.recipeTextContainer}>
                                    <Text style={styles.recipeName}>{item.name}</Text>
                                    {item.category && (
                                        <Text style={styles.recipeCategory}>{item.category}</Text>
                                    )}
                                    {item.description ? (
                                        <Text style={styles.recipeDescription} numberOfLines={2}>
                                            {item.description}
                                        </Text>
                                    ) : null}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteRecipe(item.id)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Sil</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={styles.recipeList}
                />
            )}
=======
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
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
<<<<<<< HEAD
        backgroundColor: '#D2B48C',
=======
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
    },
    header: {
        width: '100%',
        height: 80,
        backgroundColor: '#5D4037',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    subHeader: {
        flexDirection: 'row',
        alignItems: 'center',
<<<<<<< HEAD
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingTop: 10,
        paddingHorizontal: 20,
=======
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
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
<<<<<<< HEAD
        color: '#5D4037',
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
    recipeList: {
        padding: 20,
    },
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#8D6E63',
    },
    recipeContent: {
        flexDirection: 'row',
        flex: 1,
    },
    recipeImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    recipeTextContainer: {
        flex: 1,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5D4037',
        marginBottom: 4,
    },
    recipeCategory: {
        fontSize: 14,
        color: '#8D6E63',
        marginBottom: 6,
        fontWeight: 'bold',
    },
    recipeDescription: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        backgroundColor: '#B71C1C',
        padding: 10,
=======
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
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
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
    addButton: {
        backgroundColor: '#8D6E63',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 15,
        marginRight: 20,
        alignSelf: 'flex-end',
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyRecipesScreen;

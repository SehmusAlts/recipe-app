import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyRecipesScreen = ({ navigation }) => {
    const [myRecipes, setMyRecipes] = useState([]);

    const fetchMyRecipes = async () => {
        try {
            let storedRecipes = await AsyncStorage.getItem('customRecipes');
            let recipesArray = storedRecipes ? JSON.parse(storedRecipes) : [];
            
            // Geçersiz tarifleri filtrele
            recipesArray = recipesArray.filter(recipe => recipe && recipe.name);

            setMyRecipes(recipesArray);
        } catch (error) {
            console.log('Kendi tariflerini çekerken hata oluştu:', error);
        }
    };

    useEffect(() => {
        fetchMyRecipes();
        const unsubscribe = navigation.addListener('focus', fetchMyRecipes);
        return unsubscribe;
    }, [navigation]);

    // Tarif Silme
    const deleteRecipe = async (id) => {
        Alert.alert(
            "Tarifi Sil",
            "Bu tarifi silmek istediğinize emin misiniz?",
            [
                { text: "İptal", style: "cancel" },
                {
                    text: "Sil",
                    onPress: async () => {
                        try {
                            let updatedRecipes = myRecipes.filter(recipe => recipe.id !== id);
                            await AsyncStorage.setItem('customRecipes', JSON.stringify(updatedRecipes));
                            setMyRecipes(updatedRecipes);
                            Alert.alert("Başarılı", "Tarif silindi!");
                        } catch (error) {
                            console.log("Tarif silinirken hata oluştu:", error);
                        }
                    },
                    style: "destructive",
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Benim Tariflerim</Text>

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
                                    {item.description ? <Text>{item.description}</Text> : null}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteRecipe(item.id)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Sil</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#D2B48C',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        justifyContent: 'space-between',
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
    },
    deleteButton: {
        backgroundColor: '#ff4747',
        padding: 10,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MyRecipesScreen;

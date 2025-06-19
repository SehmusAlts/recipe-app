import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
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
            <StatusBar backgroundColor="#5D4037" barStyle="light-content" />
            
            {/* Başlık Çubuğu */}
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
                <Text style={styles.title}>Benim Tariflerim</Text>
                <View style={styles.spacer} />
            </View>

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D2B48C',
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
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    backButton: {
        backgroundColor: '#8D6E63',
        borderRadius: 15,
        padding: 6,
        minWidth: 65,
    },
    backButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonArrow: {
        fontSize: 16,
        color: '#FFF',
        marginRight: 3,
    },
    backButtonText: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '500',
    },
    spacer: {
        width: 65,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#5D4037',
    },
    emptyMessage: {
        fontSize: 16,
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
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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

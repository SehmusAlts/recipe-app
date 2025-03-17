import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeListScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState(['Hepsi']);
    const [selectedCategory, setSelectedCategory] = useState('Hepsi');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://dummyjson.com/recipes');
                const data = await response.json();

                // AsyncStorage'dan manuel eklenen tarifleri al
                let storedRecipes = await AsyncStorage.getItem('customRecipes');
                let customRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];

                // Geçersiz veri olup olmadığını kontrol et
                customRecipes = customRecipes.filter(recipe => recipe && recipe.name);

                // API ve manuel tarifleri birleştir
                setRecipes([...customRecipes, ...data.recipes]);

                // Kategorileri API ve manuel eklenen tariflerden al
                const uniqueCategories = [...new Set([
                    ...customRecipes.map(recipe => recipe.category).filter(Boolean),
                    ...data.recipes.flatMap(recipe => recipe.mealType || [])
                ])];

                setCategories(['Hepsi', ...uniqueCategories]);
            } catch (error) {
                console.log('API Hatası:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = selectedCategory === 'Hepsi'
        ? recipes
        : recipes.filter(recipe =>
            (recipe.mealType && recipe.mealType.some(type => type.toLowerCase() === selectedCategory.toLowerCase())) ||
            (recipe.category && recipe.category.toLowerCase() === selectedCategory.toLowerCase())
        );

    return (
        <View style={styles.container}>
            {/* Başlık ve Geri Butonu */}
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
                <Text style={styles.title}>Yemek Tarifleri</Text>
                <View style={styles.spacer} />
            </View>

            {/* Yeni Tarif Ekle Butonu */}
            <TouchableOpacity
                style={styles.addRecipeButton}
                onPress={() => navigation.navigate('AddRecipe')}
            >
                <Text style={styles.addRecipeText}>+ Yeni Tarif Ekle</Text>
            </TouchableOpacity>

            {/* Kategori Başlığı */}
            <Text style={styles.sectionTitle}>Kategoriler</Text>

            {/* Kategori Butonları - Yatay ScrollView ile */}
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={true}
                style={styles.categoryScrollView}
                contentContainerStyle={styles.categoryScrollContent}
            >
                {categories.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Yükleniyor göstergesi */}
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList
                    data={filteredRecipes}
                    keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.recipeItem}
                            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                        >
                            <Image source={{ uri: item.image }} style={styles.recipeImage} />
                            <View style={styles.recipeTextContainer}>
                                <Text style={styles.recipeName}>{item.name}</Text>
                                {item.description ? <Text>{item.description}</Text> : null}
                            </View>
                        </TouchableOpacity>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingTop: 10,
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
        width: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#5D4037',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: '#5D4037',
    },
    addRecipeButton: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    addRecipeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryScrollView: {
        marginBottom: 15,
        height: 45,
    },
    categoryScrollContent: {
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    categoryButton: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginHorizontal: 4,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedCategory: {
        backgroundColor: '#8D6E63',
        borderColor: '#8D6E63',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    selectedCategoryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
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
});

export default RecipeListScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Örnek tarif verileri
const sampleRecipes = [
    {
        id: 1,
        name: "Köfte",
        description: "Lezzetli ev yapımı köfte tarifi",
        image: "https://cdn.yemek.com/mncrop/600/315/uploads/2015/05/izmir-kofte-yemekcom.jpg",
        category: "Ana Yemek",
        ingredients: ["500g kıyma", "1 soğan", "2 diş sarımsak", "Tuz, karabiber"],
        instructions: ["Kıymayı bir kaba alın", "Soğan ve sarımsağı ince doğrayın", "Tüm malzemeleri iyice karıştırın", "Köfteleri şekillendirip pişirin"]
    },
    {
        id: 2,
        name: "Mercimek Çorbası",
        description: "Klasik Türk mercimek çorbası",
        image: "https://cdn.yemek.com/mncrop/600/315/uploads/2014/06/mercimek-corbasi-yemekcom.jpg",
        category: "Çorba",
        ingredients: ["1 su bardağı kırmızı mercimek", "1 soğan", "1 havuç", "Tuz, karabiber, pul biber"],
        instructions: ["Mercimeği yıkayın", "Tüm malzemeleri tencereye koyun", "Yumuşayana kadar pişirin", "Blenderdan geçirin"]
    },
    {
        id: 3,
        name: "Çilekli Pasta",
        description: "Taze çilekli pasta tarifi",
        image: "https://cdn.yemek.com/mncrop/600/315/uploads/2019/05/cilekli-pasta-tarifi.jpg",
        category: "Tatlı",
        ingredients: ["200g un", "3 yumurta", "150g şeker", "500g çilek", "250ml krema"],
        instructions: ["Keki hazırlayın", "Fırında pişirin", "Soğuttuktan sonra kreması ile süsleyin", "Üzerine çilekleri dizin"]
    }
];

const RecipeListScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState(['Hepsi']);
    const [selectedCategory, setSelectedCategory] = useState('Hepsi');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // AsyncStorage'dan manuel eklenen tarifleri al
                let storedRecipes = await AsyncStorage.getItem('customRecipes');
                let customRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];

                // Geçersiz veri olup olmadığını kontrol et
                customRecipes = customRecipes.filter(recipe => recipe && recipe.name);

                // Örnek verileri ve manuel eklenen tarifleri birleştir
                const allRecipes = [...customRecipes, ...sampleRecipes];
                setRecipes(allRecipes);

                // Kategorileri örnek ve manuel eklenen tariflerden al
                const uniqueCategories = [...new Set([
                    'Hepsi',
                    ...allRecipes.map(recipe => recipe.category).filter(Boolean)
                ])];

                setCategories(uniqueCategories);
                console.log('Tarifler yüklendi:', allRecipes.length);
            } catch (error) {
                console.log('Tarif yükleme hatası:', error);
                // Hata olsa bile en azından örnek tarifleri göster
                setRecipes(sampleRecipes);
                setCategories(['Hepsi', ...new Set(sampleRecipes.map(recipe => recipe.category))]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = selectedCategory === 'Hepsi'
        ? recipes
        : recipes.filter(recipe => 
            recipe.category && recipe.category.toLowerCase() === selectedCategory.toLowerCase()
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
                            <Image 
                                source={{ uri: item.image || 'https://via.placeholder.com/150x150?text=No+Image' }} 
                                style={styles.recipeImage}
                            />
                            <View style={styles.recipeTextContainer}>
                                <Text style={styles.recipeName}>{item.name}</Text>
                                {item.description && <Text style={styles.recipeDescription}>{item.description}</Text>}
                                {item.category && <Text style={styles.recipeCategory}>{item.category}</Text>}
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
    recipeDescription: {
        fontSize: 14,
        color: '#666',
    },
    recipeCategory: {
        fontSize: 14,
        color: '#666',
    },
});

export default RecipeListScreen;

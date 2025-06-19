import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recipes } from '../data/recipes';

const AddRecipeScreen = ({ navigation }) => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [category, setCategory] = useState('');
<<<<<<< HEAD
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [allCategories, setAllCategories] = useState([
        'Kahvaltı', 'Ana Yemek', 'Tatlı', 'Çorba', 'Fast Food', 'Atıştırmalık', 'İçecek'
    ]);
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');

    useEffect(() => {
        // Mevcut kategorileri dummy JSON ve AsyncStorage'dan al
        const fetchCategories = async () => {
            try {
                // Dummy JSON'dan kategorileri al
                const dummyCategories = [...new Set(recipes.map(recipe => recipe.category))];

                // AsyncStorage'dan kategorileri al
                const storedRecipes = await AsyncStorage.getItem('customRecipes');
                let customCategories = [];
                if (storedRecipes) {
                    const recipesArray = JSON.parse(storedRecipes);
                    customCategories = [...new Set(recipesArray.map(recipe => recipe.category).filter(Boolean))];
                }
                
                // Favorilerdeki kategorileri de al
                const storedFavorites = await AsyncStorage.getItem('favorites');
                let favoriteCategories = [];
                if (storedFavorites) {
                    const favoritesArray = JSON.parse(storedFavorites);
                    favoriteCategories = [...new Set(favoritesArray.map(recipe => recipe.category).filter(Boolean))];
                }

                // Tüm kategorileri birleştir ve tekrarları kaldır
                const mergedCategories = [...new Set([
                    ...allCategories, 
                    ...dummyCategories, 
                    ...customCategories,
                    ...favoriteCategories
                ])];
                
                setAllCategories(mergedCategories.sort());
            } catch (error) {
                console.log('Kategorileri alırken hata:', error);
            }
        };
        
        fetchCategories();
    }, []);

    const handleSaveRecipe = async () => {
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();
        const trimmedIngredients = ingredients.trim();
        const trimmedSteps = steps.trim();

        if (!trimmedName || !trimmedDescription || !category || !trimmedIngredients || !trimmedSteps) {
            Alert.alert('Hata', 'Lütfen tüm alanları eksiksiz doldurun!');
=======
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!recipeName || !ingredients || !instructions || !category) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
            return;
        }

        setLoading(true);
        try {
<<<<<<< HEAD
            let storedRecipes = await AsyncStorage.getItem('customRecipes');
            let recipesArray = storedRecipes ? JSON.parse(storedRecipes) : [];

            // İçindekiler listesini diziye çevir
            const ingredientsList = trimmedIngredients
                .split('\n')
                .map(item => item.trim())
                .filter(item => item.length > 0);

            // Adımları diziye çevir
            const stepsList = trimmedSteps
                .split('\n')
                .map(item => item.trim())
                .filter(item => item.length > 0);

            const newRecipe = {
                id: Date.now(),
                name: trimmedName,
                description: trimmedDescription,
                category: category,
                image: 'https://via.placeholder.com/150', // Varsayılan resim
                ingredients: ingredientsList,
                steps: stepsList,
                isCustom: true
=======
            const recipeData = {
                id: Date.now().toString(),
                name: recipeName,
                ingredients: ingredients.split('\n'),
                instructions: instructions.split('\n'),
                category,
                createdAt: new Date().toISOString(),
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
            };

            // Mevcut tarifleri al
            const existingRecipes = await AsyncStorage.getItem('recipes');
            const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
            
            // Yeni tarifi ekle
            recipes.unshift(recipeData);
            
            // Tarifleri kaydet
            await AsyncStorage.setItem('recipes', JSON.stringify(recipes));

            Alert.alert('Başarılı', 'Tarif başarıyla eklendi!');
<<<<<<< HEAD
            setName('');
            setDescription('');
            setCategory('');
            setIngredients('');
            setSteps('');
            navigation.navigate('MyRecipes');
=======
            navigation.goBack();
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
        } catch (error) {
            Alert.alert('Hata', 'Tarif eklenirken bir hata oluştu.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
<<<<<<< HEAD
            {/* Başlık ve Geri Butonu */}
=======
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
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
                <Text style={styles.headerTitle}>Yeni Tarif Ekle</Text>
            </View>

<<<<<<< HEAD
            <TextInput
                style={styles.input}
                placeholder="Tarif Adı"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tarif Açıklaması"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />
            
            {/* Kategori Seçme Butonu */}
            <TouchableOpacity 
                style={styles.categorySelector} 
                onPress={() => setShowCategoryModal(true)}
            >
                <Text style={category ? styles.categoryText : styles.placeholderText}>
                    {category || "Kategori Seçin"}
                </Text>
            </TouchableOpacity>
            
            {/* Malzemeler */}
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Malzemeler (Her malzemeyi ayrı satıra yazın)"
                value={ingredients}
                onChangeText={setIngredients}
                multiline
                numberOfLines={6}
            />
            
            {/* Hazırlama Adımları */}
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Hazırlama Adımları (Her adımı ayrı satıra yazın)"
                value={steps}
                onChangeText={setSteps}
                multiline
                numberOfLines={6}
            />
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
            
            {renderCategoryModal()}
=======
            <View style={styles.form}>
                <Text style={styles.label}>Tarif Adı</Text>
                <TextInput
                    style={styles.input}
                    value={recipeName}
                    onChangeText={setRecipeName}
                    placeholder="Tarif adını girin"
                />

                <Text style={styles.label}>Kategori</Text>
                <TextInput
                    style={styles.input}
                    value={category}
                    onChangeText={setCategory}
                    placeholder="Kategori seçin"
                />

                <Text style={styles.label}>Malzemeler</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={ingredients}
                    onChangeText={setIngredients}
                    placeholder="Her malzemeyi yeni satıra yazın"
                    multiline
                    numberOfLines={4}
                />

                <Text style={styles.label}>Hazırlanışı</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={instructions}
                    onChangeText={setInstructions}
                    placeholder="Hazırlanış adımlarını yeni satırlara yazın"
                    multiline
                    numberOfLines={6}
                />

                <TouchableOpacity 
                    style={[styles.submitButton, loading && styles.disabledButton]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.submitButtonText}>
                        {loading ? 'Ekleniyor...' : 'Tarifi Ekle'}
                    </Text>
                </TouchableOpacity>
            </View>
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    form: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    multilineInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#8D6E63',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    disabledButton: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddRecipeScreen;

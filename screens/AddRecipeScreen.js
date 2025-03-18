import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRecipeScreen = ({ navigation }) => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!recipeName || !ingredients || !instructions || !category) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
            return;
        }

        setLoading(true);
        try {
            const recipeData = {
                id: Date.now().toString(),
                name: recipeName,
                ingredients: ingredients.split('\n'),
                instructions: instructions.split('\n'),
                category,
                createdAt: new Date().toISOString(),
            };

            // Mevcut tarifleri al
            const existingRecipes = await AsyncStorage.getItem('recipes');
            const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
            
            // Yeni tarifi ekle
            recipes.unshift(recipeData);
            
            // Tarifleri kaydet
            await AsyncStorage.setItem('recipes', JSON.stringify(recipes));

            Alert.alert('Başarılı', 'Tarif başarıyla eklendi!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Hata', 'Tarif eklenirken bir hata oluştu.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
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

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRecipeScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSaveRecipe = async () => {
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();
        const trimmedCategory = category.trim().toLowerCase();

        if (!trimmedName || !trimmedDescription || !trimmedCategory) {
            Alert.alert('Hata', 'Lütfen tüm alanları eksiksiz doldurun!');
            return;
        }

        try {
            let storedRecipes = await AsyncStorage.getItem('customRecipes');
            let recipesArray = storedRecipes ? JSON.parse(storedRecipes) : [];

            const newRecipe = {
                id: Date.now(),
                name: trimmedName,
                description: trimmedDescription,
                category: trimmedCategory,
                image: 'https://via.placeholder.com/150', // Varsayılan resim
                isCustom: true
            };

            recipesArray.push(newRecipe);
            await AsyncStorage.setItem('customRecipes', JSON.stringify(recipesArray));

            Alert.alert('Başarılı', 'Tarif başarıyla eklendi!');
            setName('');
            setDescription('');
            setCategory('');
            navigation.goBack();
        } catch (error) {
            console.log('Tarif eklenirken hata oluştu:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Yeni Tarif Ekle</Text>
            <TextInput
                style={styles.input}
                placeholder="Tarif Adı"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Tarif Açıklaması"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Kategori (Örn: kahvaltı, tatlı, ana yemek)"
                value={category}
                onChangeText={setCategory}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
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
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddRecipeScreen;

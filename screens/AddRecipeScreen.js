import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRecipeScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [allCategories, setAllCategories] = useState([
        'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 
        'Appetizer', 'Side Dish', 'Beverage', 'Snacks'
    ]);

    useEffect(() => {
        // Mevcut kategorileri AsyncStorage'dan alabilirsiniz
        const fetchCategories = async () => {
            try {
                const storedRecipes = await AsyncStorage.getItem('customRecipes');
                if (storedRecipes) {
                    const recipes = JSON.parse(storedRecipes);
                    const customCategories = [...new Set(recipes.map(recipe => recipe.category).filter(Boolean))];
                    
                    // Tanımlanmış kategorilerle birleştir
                    const mergedCategories = [...new Set([...allCategories, ...customCategories])];
                    setAllCategories(mergedCategories);
                }
            } catch (error) {
                console.log('Kategorileri alırken hata:', error);
            }
        };
        
        fetchCategories();
    }, []);

    const handleSaveRecipe = async () => {
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();

        if (!trimmedName || !trimmedDescription || !category) {
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
                category: category,
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

    const renderCategoryModal = () => {
        return (
            <Modal
                visible={showCategoryModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowCategoryModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Kategori Seçin</Text>
                        <ScrollView style={styles.categoryList}>
                            {allCategories.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={styles.categoryItem}
                                    onPress={() => {
                                        setCategory(cat);
                                        setShowCategoryModal(false);
                                    }}
                                >
                                    <Text style={styles.categoryItemText}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setShowCategoryModal(false)}
                        >
                            <Text style={styles.closeButtonText}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

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
                <Text style={styles.title}>Yeni Tarif Ekle</Text>
                <View style={styles.spacer} />
            </View>

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
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
            
            {renderCategoryModal()}
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
        marginBottom: 20,
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    categorySelector: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    categoryText: {
        fontSize: 16,
        color: '#000',
    },
    placeholderText: {
        fontSize: 16,
        color: '#aaa',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    categoryList: {
        marginBottom: 15,
    },
    categoryItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    categoryItemText: {
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#8D6E63',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AddRecipeScreen;

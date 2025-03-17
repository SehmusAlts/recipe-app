import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    // Favorileri AsyncStorage'dan Yükle
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.log("Favori tarifler yüklenirken hata oluştu:", error);
            }
        };
        loadFavorites();
        
        // Favori sayfası her açıldığında güncel verileri yükle
        const unsubscribe = navigation.addListener('focus', loadFavorites);
        return unsubscribe;
    }, [navigation]);

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
                <Text style={styles.title}>Favori Tarifler</Text>
                <View style={styles.spacer} />
            </View>

            {favorites.length === 0 ? (
                <Text style={styles.noFavorites}>Henüz favorilere eklenen tarif yok.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.recipeItem}
                            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                        >
                            <Image source={{ uri: item.image }} style={styles.recipeImage} />
                            <View style={styles.recipeTextContainer}>
                                <Text style={styles.recipeName}>{item.name}</Text>
                                {item.description ? (
                                    <Text style={styles.recipeDescription} numberOfLines={2}>
                                        {item.description}
                                    </Text>
                                ) : null}
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
        width: 65,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#5D4037',
    },
    noFavorites: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
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
        color: '#333',
        marginBottom: 4,
    },
    recipeDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default FavoritesScreen;

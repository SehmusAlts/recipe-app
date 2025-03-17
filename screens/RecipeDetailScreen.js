import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeDetailScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const [rating, setRating] = useState(0);

    // Favorileri ve Puanı AsyncStorage'dan Yükle
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    const favoritesArray = JSON.parse(storedFavorites);
                    setIsFavorite(favoritesArray.some(fav => fav.id === recipe.id));
                }

                const storedRating = await AsyncStorage.getItem(`rating-${recipe.id}`);
                if (storedRating) {
                    setRating(parseInt(storedRating));
                }
            } catch (error) {
                console.log("Veri yüklenirken hata oluştu:", error);
            }
        };
        loadData();
    }, []);

    // Favoriye Ekleme / Çıkarma
    const toggleFavorite = async () => {
        try {
            let storedFavorites = await AsyncStorage.getItem('favorites');
            let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];

            if (isFavorite) {
                favoritesArray = favoritesArray.filter(fav => fav.id !== recipe.id);
            } else {
                favoritesArray.push({
                    ...recipe,
                    description: recipe.description && recipe.description.length > 0 
                        ? recipe.description 
                        : recipe.instructions 
                            ? recipe.instructions.join("\n") 
                            : "Açıklama mevcut değil.",
                });
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.log("Favori eklerken hata oluştu:", error);
        }
    };

    // Yıldız Kaydetme
    const saveRating = async (star) => {
        try {
            await AsyncStorage.setItem(`rating-${recipe.id}`, star.toString());
            setRating(star);
            console.log(`Yıldız verildi: ${star}`);
        } catch (error) {
            console.log("Puan kaydedilirken hata oluştu:", error);
        }
    };

    return (
        <View style={styles.mainContainer}>
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
                <Text style={styles.headerTitle}>{recipe.name}</Text>
                <View style={styles.spacer} />
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Yemek Resmi */}
                    {recipe.image ? (
                        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                    ) : (
                        <Text style={styles.noImageText}>Resim bulunamadı</Text>
                    )}

                    {/* Yemek Adı */}
                    <Text style={styles.title}>{recipe.name}</Text>

                    {/* Açıklama veya Tarif Adımları */}
                    <Text style={styles.description}>
                        {recipe.description && recipe.description.trim().length > 0 
                            ? recipe.description 
                            : recipe.instructions 
                                ? recipe.instructions.join("\n") 
                                : ""}
                    </Text>

                    {/* Yıldız Verme */}
                    <Text style={styles.ratingText}>Puan Ver: {rating} ⭐</Text>
                    <View style={styles.starContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => saveRating(star)}>
                                <Text style={styles.star}>{star <= rating ? '⭐' : '☆'}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Favorilere Ekleme Butonu */}
                    <TouchableOpacity 
                        style={[styles.favoriteButton, isFavorite && styles.favorited]}
                        onPress={toggleFavorite}
                    >
                        <Text style={styles.favoriteText}>
                            {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#D2B48C',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 25,
        backgroundColor: '#D2B48C',
        borderBottomWidth: 1,
        borderBottomColor: '#8D6E63',
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
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5D4037',
        textAlign: 'center',
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#D2B48C',
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    recipeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    noImageText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        fontSize: 30,
        marginHorizontal: 5,
        color: '#FFD700',
    },
    favoriteButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        width: '80%',
    },
    favorited: {
        backgroundColor: '#ff4747',
    },
    favoriteText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RecipeDetailScreen;

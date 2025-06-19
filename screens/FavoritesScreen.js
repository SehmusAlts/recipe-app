import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Favori tarifleri yükle
  const loadFavorites = async () => {
    try {
      setLoading(true);
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Favoriler yüklenirken hata oluştu:', error);
      Alert.alert('Hata', 'Favoriler yüklenirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Favori listesinden tarif çıkarma
  const removeFavorite = async (recipeId) => {
    try {
      const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      Alert.alert('Başarılı', 'Tarif favorilerden çıkarıldı.');
    } catch (error) {
      console.error('Favori çıkarılırken hata:', error);
      Alert.alert('Hata', 'Tarif favorilerden çıkarılırken bir sorun oluştu.');
    }
  };

  // Component yüklendiğinde favorileri getir
  useEffect(() => {
    loadFavorites();

    // Navigation focus listener ekleyerek, sayfaya her dönüşte favorileri güncelle
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    // Temizleme işlemi
    return unsubscribe;
  }, [navigation]);

  // Tarif öğesini render etme
  const renderRecipeItem = ({ item }) => {
    // Resim URL'si yoksa placeholder kullan
    const imageUrl = item.image && !item.image.includes('example.com') 
      ? item.image 
      : 'https://via.placeholder.com/100x100.png?text=Tarif';

    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      >
        <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <Text style={styles.recipeCategory}>{item.category}</Text>
          <Text style={styles.recipeDescription} numberOfLines={2}>
            {item.description}
          </Text>
=======
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFavorites = async () => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            const recipesData = await AsyncStorage.getItem('recipes');
            
            if (favoritesData && recipesData) {
                const favoriteIds = JSON.parse(favoritesData);
                const allRecipes = JSON.parse(recipesData);
                
                const favoriteRecipes = allRecipes.filter(recipe => 
                    favoriteIds.includes(recipe.id)
                );
                
                setFavorites(favoriteRecipes);
            }
        } catch (error) {
            console.error('Favoriler yüklenirken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleRemoveFavorite = async (recipeId) => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            if (favoritesData) {
                const favoriteIds = JSON.parse(favoritesData);
                const updatedFavorites = favoriteIds.filter(id => id !== recipeId);
                await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                
                setFavorites(prevFavorites => 
                    prevFavorites.filter(recipe => recipe.id !== recipeId)
                );
            }
        } catch (error) {
            console.error('Favori kaldırılırken hata:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
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
                <Text style={styles.headerTitle}>Favori Tariflerim</Text>
            </View>

            <ScrollView style={styles.recipeList}>
                {favorites.length === 0 ? (
                    <Text style={styles.noFavorites}>
                        Henüz favori tarifiniz bulunmuyor.
                    </Text>
                ) : (
                    favorites.map(recipe => (
                        <View key={recipe.id} style={styles.recipeCard}>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                            <Text style={styles.recipeCategory}>{recipe.category}</Text>
                            <Text style={styles.recipeDate}>
                                {new Date(recipe.createdAt).toLocaleDateString('tr-TR')}
                            </Text>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => handleRemoveFavorite(recipe.id)}
                            >
                                <Text style={styles.removeButtonText}>Favorilerden Çıkar</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => {
            Alert.alert(
              'Favorilerden Çıkar',
              `${item.name} tarifini favorilerden çıkarmak istiyor musunuz?`,
              [
                { text: 'İptal', style: 'cancel' },
                { text: 'Çıkar', style: 'destructive', onPress: () => removeFavorite(item.id) },
              ]
            );
          }}
        >
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.title}>Favori Tariflerim</Text>
        <View style={styles.spacer} />
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      ) : favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipeItem}
          contentContainerStyle={styles.recipeList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Henüz favori tarif eklemediniz.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Recipes')}
          >
            <Text style={styles.browseButtonText}>Tariflere Göz At</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
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
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  loadingText: {
    fontSize: 16,
    color: '#5D4037',
    fontWeight: 'bold',
  },
  recipeList: {
    padding: 20,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#8D6E63',
  },
  recipeImage: {
    width: 100,
    height: 100,
  },
  recipeInfo: {
    flex: 1,
    padding: 10,
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
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#B71C1C',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  browseButton: {
    backgroundColor: '#8D6E63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
=======
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    recipeList: {
        flex: 1,
        padding: 16,
    },
    noFavorites: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    recipeCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    recipeCategory: {
        fontSize: 14,
        color: '#666',
    },
    recipeDate: {
        fontSize: 12,
        color: '#666',
    },
    removeButton: {
        padding: 8,
        backgroundColor: '#FF4500',
        borderRadius: 8,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
});

export default FavoritesScreen;

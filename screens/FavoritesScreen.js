import React, { useState, useEffect } from 'react';
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
});

export default FavoritesScreen;

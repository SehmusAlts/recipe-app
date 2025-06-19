import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { recipes as dummyRecipes } from '../data/recipes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [categories, setCategories] = useState(['Tümü']);

  // Tüm tarifleri yükle (dummy + custom)
  useEffect(() => {
    const loadAllRecipes = async () => {
      try {
        setLoading(true);
        
        // Kullanıcının kendi tariflerini al
        const storedRecipes = await AsyncStorage.getItem('customRecipes');
        const customRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
        
        // Tüm tarifleri birleştir ve ID'lere göre benzersiz hale getir
        const combinedRecipes = [...dummyRecipes, ...customRecipes];
        
        // Dublike tarifleri kaldır
        const uniqueRecipes = [...new Map(combinedRecipes.map(item => [item.id, item])).values()];
        
        // Tüm kategorileri al
        const allCategories = ['Tümü', ...new Set(uniqueRecipes.map(recipe => recipe.category))];
        
        setAllRecipes(uniqueRecipes);
        setFilteredRecipes(uniqueRecipes);
        setCategories(allCategories);
        
      } catch (error) {
        console.log('Tarifleri yüklerken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllRecipes();
    
    // Sayfaya her dönüldüğünde tarifleri güncelleyin
    const unsubscribe = navigation.addListener('focus', loadAllRecipes);
    return unsubscribe;
  }, [navigation]);

  // Arama ve filtreleme
  const handleSearch = (text) => {
    setSearchQuery(text);
    filterRecipes(text, selectedCategory);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterRecipes(searchQuery, category);
  };

  const filterRecipes = (query, category) => {
    let filtered = allRecipes;
    
    // Kategoriye göre filtrele
    if (category !== 'Tümü') {
      filtered = filtered.filter(recipe => recipe.category === category);
    }
    
    // Arama sorgusuna göre filtrele
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.name.toLowerCase().includes(lowercaseQuery) ||
        (recipe.description && recipe.description.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    setFilteredRecipes(filtered);
  };

  // Tarif kartı render etme
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
          {item.isCustom && (
            <View style={styles.customBadge}>
              <Text style={styles.customBadgeText}>Kendi Tarifim</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar backgroundColor="#5D4037" barStyle="light-content" />
        <ActivityIndicator size="large" color="#8D6E63" />
        <Text style={styles.loadingText}>Tarifler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#5D4037" barStyle="light-content" />
      
      {/* Başlık Çubuğu */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Yemek Tarif Uygulaması</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tarif ara..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#8D6E63"
        />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategory,
              ]}
              onPress={() => handleCategorySelect(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {filteredRecipes.length > 0 ? (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipeItem}
          contentContainerStyle={styles.recipeList}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            Arama kriterlerine uygun tarif bulunamadı.
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2B48C',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#5D4037',
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#D2B48C',
    borderBottomWidth: 1,
    borderBottomColor: '#8D6E63',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#8D6E63',
    color: '#5D4037',
  },
  categoriesContainer: {
    paddingVertical: 12,
    backgroundColor: '#D2B48C',
    borderBottomWidth: 1,
    borderBottomColor: '#8D6E63',
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8D6E63',
  },
  selectedCategory: {
    backgroundColor: '#8D6E63',
  },
  categoryText: {
    fontSize: 14,
    color: '#5D4037',
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recipeList: {
    padding: 10,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    position: 'relative',
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
  customBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  customBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#5D4037',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RecipesScreen; 
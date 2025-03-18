import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock veri
let mockRecipes = [];
let mockFavorites = {};
let mockRatings = {};

// AsyncStorage Key'leri
const RECIPES_KEY = 'recipes';
const FAVORITES_KEY = 'favorites';
const RATINGS_KEY = 'ratings';
const CURRENT_USER_KEY = 'currentUser';

// Mock verilerimizi başlangıçta yükleme
const initData = async () => {
  try {
    const recipesData = await AsyncStorage.getItem(RECIPES_KEY);
    if (recipesData) mockRecipes = JSON.parse(recipesData);
    
    const favoritesData = await AsyncStorage.getItem(FAVORITES_KEY);
    if (favoritesData) mockFavorites = JSON.parse(favoritesData);
    
    const ratingsData = await AsyncStorage.getItem(RATINGS_KEY);
    if (ratingsData) mockRatings = JSON.parse(ratingsData);
  } catch (error) {
    console.error('Veri yüklenirken hata oluştu:', error);
  }
};

// Uygulama başladığında verileri yükle
initData();

// Mevcut kullanıcıyı al
const getCurrentUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Kullanıcı verisi alınırken hata:', error);
    return null;
  }
};

// Tarif Ekleme
export const addRecipe = async (recipeData) => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const newRecipe = {
      id: Date.now().toString(),
      ...recipeData,
      userId: user.email,
      createdAt: new Date().toISOString(),
    };
    
    mockRecipes.unshift(newRecipe);
    await AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(mockRecipes));
    return newRecipe;
  } catch (error) {
    console.error('Tarif eklenirken hata:', error);
    return null;
  }
};

// Kullanıcının Tarifleri
export const getUserRecipes = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    
    return mockRecipes.filter(recipe => recipe.userId === user.email);
  } catch (error) {
    console.error('Kullanıcı tarifleri alınırken hata:', error);
    return [];
  }
};

// Tüm Tarifler
export const getAllRecipes = async () => {
  try {
    return mockRecipes;
  } catch (error) {
    console.error('Tüm tarifler alınırken hata:', error);
    return [];
  }
};

// Favori İşlemleri
export const toggleFavorite = async (recipeId) => {
  try {
    const user = await getCurrentUser();
    if (!user) return false;
    
    const userId = user.email;
    
    if (!mockFavorites[userId]) {
      mockFavorites[userId] = [];
    }
    
    const index = mockFavorites[userId].indexOf(recipeId);
    
    if (index > -1) {
      // Zaten favorilerdeyse kaldır
      mockFavorites[userId].splice(index, 1);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(mockFavorites));
      return false;
    } else {
      // Favorilerde değilse ekle
      mockFavorites[userId].push(recipeId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(mockFavorites));
      return true;
    }
  } catch (error) {
    console.error('Favori işlemi sırasında hata:', error);
    return false;
  }
};

// Favori Tarifleri Getir
export const getFavoriteRecipes = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    
    const userId = user.email;
    
    if (!mockFavorites[userId]) {
      return [];
    }
    
    const favoriteIds = mockFavorites[userId];
    return mockRecipes.filter(recipe => favoriteIds.includes(recipe.id));
  } catch (error) {
    console.error('Favori tarifleri alırken hata:', error);
    return [];
  }
};

// Yıldız Verme İşlemleri
export const rateRecipe = async (recipeId, rating) => {
  try {
    const user = await getCurrentUser();
    if (!user) return false;
    
    const userId = user.email;
    
    if (!mockRatings[userId]) {
      mockRatings[userId] = {};
    }
    
    mockRatings[userId][recipeId] = rating;
    await AsyncStorage.setItem(RATINGS_KEY, JSON.stringify(mockRatings));
    return true;
  } catch (error) {
    console.error('Yıldız verirken hata:', error);
    return false;
  }
};

// Kullanıcının Verdiği Yıldızı Getir
export const getUserRating = async (recipeId) => {
  try {
    const user = await getCurrentUser();
    if (!user) return 0;
    
    const userId = user.email;
    
    if (!mockRatings[userId] || !mockRatings[userId][recipeId]) {
      return 0;
    }
    
    return mockRatings[userId][recipeId];
  } catch (error) {
    console.error('Kullanıcı yıldızı alınırken hata:', error);
    return 0;
  }
}; 
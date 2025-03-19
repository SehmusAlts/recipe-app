import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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

// Yeni tarif ekleme
export const addRecipe = async (recipeData) => {
    try {
        const user = auth().currentUser;
        if (!user) throw new Error('Kullanıcı giriş yapmamış');

        const recipe = {
            ...recipeData,
            userId: user.uid,
            createdAt: firestore.FieldValue.serverTimestamp(),
            favorites: [],
            ratings: {}
        };

        const docRef = await firestore().collection('recipes').add(recipe);
        return { success: true, recipeId: docRef.id };
    } catch (error) {
        console.error('Tarif eklenirken hata:', error);
        return { success: false, error: error.message };
    }
};

// Kullanıcının tariflerini getirme
export const getUserRecipes = async () => {
    try {
        const user = auth().currentUser;
        if (!user) throw new Error('Kullanıcı giriş yapmamış');

        const snapshot = await firestore()
            .collection('recipes')
            .where('userId', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Tarifler getirilirken hata:', error);
        return [];
    }
};

// Tüm tarifleri getirme
export const getAllRecipes = async () => {
    try {
        const snapshot = await firestore()
            .collection('recipes')
            .orderBy('createdAt', 'desc')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Tarifler getirilirken hata:', error);
        return [];
    }
};

// Tarifi favorilere ekleme/çıkarma
export const toggleFavorite = async (recipeId) => {
    try {
        const user = auth().currentUser;
        if (!user) throw new Error('Kullanıcı giriş yapmamış');

        const recipeRef = firestore().collection('recipes').doc(recipeId);
        const doc = await recipeRef.get();
        
        if (!doc.exists) throw new Error('Tarif bulunamadı');
        
        const recipe = doc.data();
        const favorites = recipe.favorites || [];
        const isFavorited = favorites.includes(user.uid);

        if (isFavorited) {
            await recipeRef.update({
                favorites: firestore.FieldValue.arrayRemove(user.uid)
            });
        } else {
            await recipeRef.update({
                favorites: firestore.FieldValue.arrayUnion(user.uid)
            });
        }

        return { success: true, isFavorited: !isFavorited };
    } catch (error) {
        console.error('Favori işlemi sırasında hata:', error);
        return { success: false, error: error.message };
    }
};

// Favori tarifleri getirme
export const getFavoriteRecipes = async () => {
    try {
        const user = auth().currentUser;
        if (!user) throw new Error('Kullanıcı giriş yapmamış');

        const snapshot = await firestore()
            .collection('recipes')
            .where('favorites', 'array-contains', user.uid)
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Favori tarifler getirilirken hata:', error);
        return [];
    }
};

// Tarife puan verme
export const rateRecipe = async (recipeId, rating) => {
    try {
        const user = auth().currentUser;
        if (!user) throw new Error('Kullanıcı giriş yapmamış');

        const recipeRef = firestore().collection('recipes').doc(recipeId);
        await recipeRef.update({
            [`ratings.${user.uid}`]: rating
        });

        return { success: true };
    } catch (error) {
        console.error('Puan verme işlemi sırasında hata:', error);
        return { success: false, error: error.message };
    }
};

// Kullanıcının verdiği puanı getirme
export const getUserRating = async (recipeId) => {
    try {
        const user = auth().currentUser;
        if (!user) return null;

        const doc = await firestore()
            .collection('recipes')
            .doc(recipeId)
            .get();

        if (!doc.exists) return null;

        const recipe = doc.data();
        return recipe.ratings?.[user.uid] || null;
    } catch (error) {
        console.error('Kullanıcı puanı getirilirken hata:', error);
        return null;
    }
}; 
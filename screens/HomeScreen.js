import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recipes } from '../data/recipes';

const HomeScreen = ({ navigation }) => {
    const { user } = useAuth();
    
    // Uygulama ilk açıldığında varsayılan tarifleri yükle
    useEffect(() => {
        const loadDefaultRecipes = async () => {
            try {
                // Daha önce tariflerin yüklenip yüklenmediğini kontrol et
                const isLoaded = await AsyncStorage.getItem('defaultRecipesLoaded');
                
                if (isLoaded !== 'true') {
                    // Önce mevcut favorileri kontrol et
                    const storedFavorites = await AsyncStorage.getItem('favorites');
                    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
                    
                    // Favoriler karışımını doğru formata getir
                    const uniqueFavorites = [...new Map(favorites.map(item => [item.id, item])).values()];
                    
                    // Eğer favoriler eklenmemişse, random 3 tarifi favorilere ekle
                    if (uniqueFavorites.length === 0) {
                        // Rastgele 3 tarifi seç
                        const randomRecipes = [...recipes]
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3);
                        
                        // Favorilere ekle
                        await AsyncStorage.setItem('favorites', JSON.stringify(randomRecipes));
                    } else {
                        // Favorileri güncelle
                        await AsyncStorage.setItem('favorites', JSON.stringify(uniqueFavorites));
                    }
                    
                    // Varsayılan tariflerin yüklendiğini işaretle
                    await AsyncStorage.setItem('defaultRecipesLoaded', 'true');
                }
            } catch (error) {
                console.log('Varsayılan tarifleri yüklerken hata:', error);
            }
        };
        
        loadDefaultRecipes();
    }, []);
    
    // Kullanıcının adını veya e-postasını alır
    const getUserName = () => {
        if (!user) return 'Misafir';
        if (user.firstName) return user.firstName; // Kaydolurken girilen ismi göster
        return user.email.split('@')[0]; // Eğer isim yoksa email kullanıcı adını göster
    };
    
    const handleButtonPress = (screenName) => {
        if (screenName === 'Logout') {
            navigation.navigate('Logout');
            return;
        }
        
        if (screenName === 'Recipes') {
            navigation.navigate('Recipes');
            return;
        }
        
        if (screenName === 'MyRecipes') {
            navigation.navigate('MyRecipes');
            return;
        }
        
        if (screenName === 'Favorites') {
            navigation.navigate('Favorites');
            return;
        }
        
        // Henüz uygulanmamış diğer işlevsellikler için bildirim göster
        Alert.alert(
            'Bilgi',
            'Bu özellik henüz geliştirilme aşamasındadır.',
            [{ text: 'Tamam', style: 'default' }]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#5D4037" barStyle="light-content" />

            {/* Üst Kısım (Koyu Kahverengi) */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Yemek Tarif Uygulaması</Text>
            </View>
            
            {/* Ana İçerik */}
            <View style={styles.content}>
                {/* Hamburger Logosu - Ortalanmış */}
                <Image 
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }} 
                    style={styles.logo} 
                />

                {/* Açıklama Metni */}
                <Text style={styles.subtitle}>Lezzetli tarifleri keşfedin!</Text>
                
                {/* Butonlar */}
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleButtonPress('Recipes')}
                >
                    <Text style={styles.buttonText}>Tarifleri Görüntüle</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleButtonPress('Favorites')}
                >
                    <Text style={styles.buttonText}>Favoriler</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleButtonPress('MyRecipes')}
                >
                    <Text style={styles.buttonText}>Benim Tariflerim</Text>
                </TouchableOpacity>

                {/* Çıkış Butonu */}
                <TouchableOpacity 
                    style={[styles.button, styles.logoutButton]} 
                    onPress={() => handleButtonPress('Logout')}
                >
                    <Text style={styles.buttonText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#6D4C41',
        marginBottom: 15,
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 16,
        color: '#5D4037',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#8D6E63',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#B71C1C',
        marginTop: 20,
    },
});

export default HomeScreen;

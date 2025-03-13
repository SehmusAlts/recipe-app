import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#5D4037" barStyle="light-content" />

            {/* Üst Kısım (Koyu Kahverengi) */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Ana Sayfa</Text>
            </View>

            {/* Hamburger Logosu */}
            <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }} 
                style={styles.logo} 
            />

            {/* Açıklama Metni */}
            <Text style={styles.subtitle}>Lezzetli tarifleri keşfedin!</Text>

            {/* Butonlar */}
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Recipes')}
            >
                <Text style={styles.buttonText}>Tarifleri Görüntüle</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Favorites')}
            >
                <Text style={styles.buttonText}>Favoriler</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('MyRecipes')}
            >
                <Text style={styles.buttonText}>Benim Tariflerim</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D2B48C',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        position: 'absolute',
        top: 0,
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
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#6D4C41',
        marginBottom: 30,
        textAlign: 'center',
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
});

export default HomeScreen;

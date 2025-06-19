import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();
  const { login, user } = useAuth();

  const API_URL = 'http://10.0.2.2:3000'; // Android emülatörü için sabit URL

  // Kullanıcı bilgilerini kontrol et ve ismi göster
  useEffect(() => {
    if (user) {
      const name = user.firstName || user.email.split('@')[0];
      setUserName(name);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Giriş başarılı
        login(data.user);
        // Auth durumu değiştiğinde AppNavigator otomatik olarak yönlendirecek
      } else {
        Alert.alert('Hata', data.message || 'Geçersiz email veya şifre');
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu. Sunucu bağlantısını kontrol edin.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5D4037" barStyle="light-content" />
      
      {/* Başlık Çubuğu */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Yemek Tarif Uygulaması</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Hamburger Logosu */}
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }} 
            style={styles.logo} 
          />
          
          {/* Kullanıcı giriş yapmışsa adını göster */}
          {user ? (
            <Text style={styles.welcomeText}>Hoş geldiniz, {userName}</Text>
          ) : (
            <Text style={styles.subtitle}>Giriş Yap</Text>
          )}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#8D6E63"
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#8D6E63"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Hesabınız yok mu? Kayıt olun</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
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
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: '#5D4037',
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: '#5D4037',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#8D6E63',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
    width: '100%',
    color: '#5D4037',
  },
  button: {
    backgroundColor: '#8D6E63',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#5D4037',
    fontWeight: 'bold',
  }
});

export default LoginScreen; 
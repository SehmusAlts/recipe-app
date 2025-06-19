<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const { signIn, signUp } = useAuth();

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen e-posta ve şifre alanlarını doldurun.');
            return;
        }

        setLoading(true);
        try {
            let success;
            if (isLogin) {
                success = await signIn(email, password);
                if (!success) {
                    Alert.alert('Hata', 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
                }
            } else {
                success = await signUp(email, password);
                if (!success) {
                    Alert.alert('Hata', 'Bu e-posta adresi zaten kullanımda.');
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Hata', `${isLogin ? 'Giriş yapılırken' : 'Kayıt olurken'} bir hata oluştu.`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8D6E63" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Yemek Tarifleri</Text>
            <Text style={styles.subtitle}>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Text>

            <TextInput
                style={styles.input}
                placeholder="E-posta"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Şifre"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={[styles.submitButton, loading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.submitButtonText}>
                    {loading ? 'İşlem yapılıyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsLogin(!isLogin)}
            >
                <Text style={styles.toggleButtonText}>
                    {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#D2B48C',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2B48C',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#5D4037',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
        color: '#8D6E63',
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#8D6E63',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    toggleButton: {
        padding: 10,
    },
    toggleButtonText: {
        color: '#5D4037',
        fontSize: 14,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    disabledButton: {
        opacity: 0.7,
    },
>>>>>>> 8950b8de1554e7bf1e4414870fee3cc5c14d6398
});

export default LoginScreen; 
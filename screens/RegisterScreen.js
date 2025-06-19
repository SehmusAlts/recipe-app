import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Image
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Emülatör için 10.0.2.2, gerçek cihaz için kendi IP adresiniz
  const API_URL = 'http://10.0.2.2:3000';

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Kayıt isteği gönderiliyor...');
      console.log('API URL:', `${API_URL}/api/register`);
      console.log('Gönderilen veri:', { firstName, lastName, email, password: '***' });

      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      console.log('Yanıt alındı. Status:', response.status);
      
      const data = await response.json();
      console.log('Yanıt verisi:', data);

      if (response.ok) {
        // Kayıt başarılı
        Alert.alert('Başarılı', 'Hesabınız oluşturuldu. Giriş yapabilirsiniz.');
        login(data.user);
        // Auth durumu değiştiğinde AppNavigator otomatik olarak yönlendirecek
      } else {
        Alert.alert('Hata', data.message || 'Kayıt işlemi başarısız.');
      }
    } catch (error) {
      console.error('Kayıt hatası:', error);
      Alert.alert('Hata', `Kayıt yapılırken bir hata oluştu: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5D4037" barStyle="light-content" />
      
      {/* Başlık Çubuğu */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Yemek Tarif Uygulaması</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            {/* Hamburger Logosu */}
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' }} 
              style={styles.logo} 
            />
            
            <Text style={styles.title}>Yeni Hesap Oluştur</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Ad"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              placeholderTextColor="#8D6E63"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Soyad"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              placeholderTextColor="#8D6E63"
            />
            
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
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
            
            <TextInput
              style={styles.input}
              placeholder="Şifre Tekrar"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="#8D6E63"
            />
            
            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]} 
              onPress={handleRegister} 
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}
              disabled={isLoading}
            >
              <Text style={styles.linkText}>
                Zaten hesabınız var mı? Giriş yapın
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

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
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#5D4037',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#8D6E63',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
    color: '#5D4037',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#8D6E63',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#5D4037',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
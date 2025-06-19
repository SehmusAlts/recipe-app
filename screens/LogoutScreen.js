import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LogoutScreen = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        // Çıkış yaptıktan sonra otomatik olarak Login ekranına yönlendirilecek
        // çünkü AppNavigator, auth durumuna göre ekranları gösteriyor
      } catch (error) {
        console.error('Çıkış yaparken hata:', error);
      }
    };

    performLogout();
  }, [logout]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={styles.text}>Çıkış yapılıyor...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default LogoutScreen; 
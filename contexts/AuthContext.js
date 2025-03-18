import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Uygulama başladığında kullanıcı durumunu kontrol et
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Kullanıcı durumu kontrol edilirken hata:', error);
        }
    };

    const signIn = async (email, password) => {
        try {
            // Kayıtlı kullanıcıları kontrol et
            const usersData = await AsyncStorage.getItem('users');
            if (!usersData) {
                console.log('Kayıtlı kullanıcı bulunamadı');
                return false;
            }

            const users = JSON.parse(usersData);
            if (!Array.isArray(users)) {
                console.log('Geçersiz kullanıcı verisi');
                return false;
            }

            // Kullanıcı var mı ve şifre doğru mu kontrol et
            const existingUser = users.find(u => u.email === email && u.password === password);
            if (!existingUser) {
                console.log('E-posta veya şifre hatalı');
                return false;
            }

            // Kullanıcıyı oturum açmış olarak ayarla
            await AsyncStorage.setItem('user', JSON.stringify(existingUser));
            setUser(existingUser);
            console.log('Giriş başarılı');
            return true;
        } catch (error) {
            console.error('Giriş yapılırken hata:', error);
            return false;
        }
    };

    const signUp = async (email, password) => {
        try {
            // Kayıtlı kullanıcıları al
            let users = [];
            const usersData = await AsyncStorage.getItem('users');
            
            if (usersData) {
                users = JSON.parse(usersData);
                if (!Array.isArray(users)) {
                    users = [];
                }
            }

            // E-posta adresi zaten kayıtlı mı kontrol et
            if (users.some(u => u.email === email)) {
                console.log('Bu e-posta adresi zaten kullanımda');
                return false;
            }

            // Yeni kullanıcı oluştur
            const newUser = {
                email,
                password, // Şifreyi de saklıyoruz
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            };
            
            // Kullanıcıyı kaydet
            users.push(newUser);
            await AsyncStorage.setItem('users', JSON.stringify(users));
            
            // Kullanıcıyı oturum açmış olarak ayarla
            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            
            console.log('Kayıt başarılı');
            return true;
        } catch (error) {
            console.error('Kayıt olurken hata:', error);
            return false;
        }
    };

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            console.log('Çıkış başarılı');
            return true;
        } catch (error) {
            console.error('Çıkış yapılırken hata:', error);
            return false;
        }
    };

    const value = {
        user,
        signIn,
        signUp,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 
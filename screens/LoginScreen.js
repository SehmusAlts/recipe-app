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
});

export default LoginScreen; 
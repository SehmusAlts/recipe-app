import React, { createContext, useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userDoc = await firestore().collection('users').doc(user.uid).get();
                if (!userDoc.exists) {
                    await firestore().collection('users').doc(user.uid).set({
                        email: user.email,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    });
                }
            }
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async (email, password) => {
        try {
            const result = await auth().signInWithEmailAndPassword(email, password);
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signUp = async (email, password) => {
        try {
            const result = await auth().createUserWithEmailAndPassword(email, password);
            await firestore().collection('users').doc(result.user.uid).set({
                email: email,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signOut = async () => {
        try {
            await auth().signOut();
            return true;
        } catch (error) {
            console.error('Çıkış yapılırken hata:', error);
            return false;
        }
    };

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 
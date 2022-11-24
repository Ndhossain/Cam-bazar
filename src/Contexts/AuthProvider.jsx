import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import '../firebase.config';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

    const registerUser = async (email, password, name, image) => {
        setLoading(true);
        const auth = getAuth();
        const createUserRes = await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        await updateProfile(user, {
            displayName: name,
            photoURL: image,
        });
        sendEmailVerification(auth.currentUser);
        setCurrentUser({
            ...user,
        });
        return createUserRes;
    };

    const loginUser = async (email, password) => {
        setLoading(true);
        const auth = getAuth();
        const loginUserRes = await signInWithEmailAndPassword(auth, email, password);
        return loginUserRes;
    };

    const providerLogin = async (provider) => {
        const auth = getAuth();
        const providerRes = signInWithPopup(auth, provider);
        return providerRes;
    };

    const logoutUser = () => {
        const auth = getAuth();
        return signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loading,
                setLoading,
                registerUser,
                loginUser,
                logoutUser,
                providerLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
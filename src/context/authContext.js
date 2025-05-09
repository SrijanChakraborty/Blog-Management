import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  

  const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
      setUser({ uid: firebaseUser.uid, ...userDoc.data() });
      setIsLogin(true);
    } else {
      setUser(null);
      setIsLogin(false); 
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

 const signup = async (email, password, fullName, phone) => {
  try {
 
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    await firestore().collection('users').doc(userCredential.user.uid).set({
      email,      
      fullName,   
      phone,       
      createdAt: firestore.FieldValue.serverTimestamp(),  
      updatedAt: firestore.FieldValue.serverTimestamp(), 
    });
    setUser({ 
      uid: userCredential.user.uid, 
      email, 
      fullName, 
      phone 
    });
    setIsLogin(true);

  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error(error.message); 
     setIsLogin(false);
  }
};


const login = async (email, password) => {
  try {

    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log("login")
    const userDoc = await firestore().collection('users').doc(userCredential.user.uid).get();
    setUser({ uid: userCredential.user.uid, ...userDoc.data() });
 setIsLogin(true);

  } catch (error) {
    console.error("Error during login:", error);
 setIsLogin(false);
    throw new Error(error.message); 
  }
};


  const logout = async () => {
    await auth().signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isLogin, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
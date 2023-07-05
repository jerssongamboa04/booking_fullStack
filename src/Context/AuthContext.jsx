import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailUser, setEmailUser] = useState('');
  const [user_id, setUser_id] = useState('')

  const signup = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve(userCredential.user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve(userCredential.user)
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const logout = () => signOut(auth);

  const loginWhitGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

  }, []);



  return (
    <UserContext.Provider value={{ user, setUser,user_id, setUser_id, emailUser, setEmailUser, signup, login, logout, loading, loginWhitGoogle }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;

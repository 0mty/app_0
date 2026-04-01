import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";

export const SteamAuthContext = createContext({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

// When true the provider will sign out any persisted user on startup
// (useful for assignments where you want credentials prompted each run).
const FORCE_FRESH_LOGIN = true;

export const SteamAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = () => {};
    (async () => {
      if (FORCE_FRESH_LOGIN) {
        try {
          await firebaseSignOut(auth);
        } catch (e) {
          // ignore signOut errors (user may already be signed out)
        }
      }

      unsub = onAuthStateChanged(auth, (u) => {
        setUser(u ? { uid: u.uid, email: u.email } : null);
        setLoading(false);
      });
    })();

    return () => typeof unsub === "function" && unsub();
  }, []);

  const signUp = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const u = res.user;
    setUser({ uid: u.uid, email: u.email });
    return u;
  };

  const signIn = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const u = res.user;
    setUser({ uid: u.uid, email: u.email });
    return u;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <SteamAuthContext.Provider
      value={{ user, loading, signUp, signIn, signOut }}
    >
      {children}
    </SteamAuthContext.Provider>
  );
};

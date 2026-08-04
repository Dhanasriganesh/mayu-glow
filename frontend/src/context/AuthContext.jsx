import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to check if address fields are complete
  const isProfileComplete = (profile) => {
    if (!profile) return false;
    const { address, postalCode, city, state, country } = profile;
    return Boolean(
      address && address.trim() !== '' &&
      postalCode && postalCode.trim() !== '' &&
      city && city.trim() !== '' &&
      state && state.trim() !== '' &&
      country && country.trim() !== ''
    );
  };

  const fetchUserProfileAndRole = async (user) => {
    if (!user) {
      setCurrentUser(null);
      setUserProfile(null);
      setRole(null);
      return;
    }

    try {
      // Get ID token result for custom claim "role"
      const tokenResult = await user.getIdTokenResult(true);
      const userRole = tokenResult.claims.role || 'user';
      setRole(userRole);

      // Fetch user profile via Express API (GET /api/users/me)
      try {
        const response = await axiosClient.get('/users/me');
        setUserProfile(response.data);
      } catch {
        setUserProfile({
          uid: user.uid,
          email: user.email,
          role: userRole
        });
      }
    } catch (err) {
      console.warn("Auth token / profile notice:", err.message);
      setRole('user');
      setUserProfile(user);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await fetchUserProfileAndRole(user);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Signup flow via Express API (Section 3)
  const signup = async ({ email, password, firstName, lastName, phone }) => {
    try {
      // 1. Call Express API POST /api/auth/signup (Admin SDK creates user + Firestore doc)
      await axiosClient.post('/auth/signup', {
        email,
        password,
        firstName,
        lastName,
        phone
      });

      // 2. Sign in via Client Auth SDK
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setCurrentUser(user);
      await fetchUserProfileAndRole(user);

      return user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error.response?.data?.error ? new Error(error.response.data.error) : error;
    }
  };

  // Login flow via Client Auth SDK
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const tokenResult = await user.getIdTokenResult(true);
      const userRole = tokenResult.claims.role || 'user';

      setCurrentUser(user);
      setRole(userRole);

      try {
        const profileRes = await axiosClient.get('/users/me');
        setUserProfile(profileRes.data);
      } catch {
        setUserProfile({ uid: user.uid, email, role: userRole });
      }

      return { user, role: userRole };
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data?.error ? new Error(error.response.data.error) : error;
    }
  };

  // Logout flow
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
    setRole(null);
  };

  // Profile completion / merge flow via Express API (PATCH /api/users/me)
  const updateProfileData = async (data) => {
    if (!currentUser) throw new Error("No authenticated user");

    const response = await axiosClient.patch('/users/me', data);
    setUserProfile(response.data);
    return response.data;
  };

  const devSetRole = (newRole) => {
    setRole(newRole);
    if (userProfile) {
      setUserProfile({ ...userProfile, role: newRole });
    }
  };

  const value = {
    currentUser,
    userProfile,
    role,
    loading,
    signup,
    login,
    logout,
    updateProfileData,
    isProfileComplete,
    devSetRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

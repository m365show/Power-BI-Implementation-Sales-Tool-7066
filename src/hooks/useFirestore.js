import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';

export const useFirestore = () => {
  const { user } = useAuth();

  const saveCalculation = async (calculationData) => {
    if (!user) throw new Error('User must be authenticated');

    const docRef = await addDoc(collection(db, 'calculations'), {
      ...calculationData,
      userId: user.uid,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  };

  const updateCalculation = async (calculationId, updateData) => {
    if (!user) throw new Error('User must be authenticated');

    await updateDoc(doc(db, 'calculations', calculationId), {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
  };

  const deleteCalculation = async (calculationId) => {
    if (!user) throw new Error('User must be authenticated');

    await deleteDoc(doc(db, 'calculations', calculationId));
  };

  const getUserCalculations = async () => {
    if (!user) return [];

    const q = query(
      collection(db, 'calculations'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };

  const savePitchDeck = async (pitchDeckData) => {
    if (!user) throw new Error('User must be authenticated');

    const docRef = await addDoc(collection(db, 'pitchDecks'), {
      ...pitchDeckData,
      userId: user.uid,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  };

  const getUserPitchDecks = async () => {
    if (!user) return [];

    const q = query(
      collection(db, 'pitchDecks'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };

  const saveUserActivity = async (activity) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'userActivity'), {
        userId: user.uid,
        userEmail: user.email,
        action: activity.action,
        page: activity.page,
        details: activity.details || {},
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving user activity:', error);
      // Don't throw error for activity tracking failures
    }
  };

  return {
    saveCalculation,
    updateCalculation,
    deleteCalculation,
    getUserCalculations,
    savePitchDeck,
    getUserPitchDecks,
    saveUserActivity
  };
};

export const useRealtimeCalculations = () => {
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCalculations([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'calculations'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const calculationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCalculations(calculationsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching real-time calculations:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return { calculations, loading };
};
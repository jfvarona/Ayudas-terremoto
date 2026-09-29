import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../config/firebase';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección de necesidades
const needsCollection = collection(db, 'needs');

// Agregar una nueva necesidad
export const addNeed = async (needData) => {
  try {
    const docRef = await addDoc(needsCollection, {
      ...needData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al agregar necesidad:', error);
    return { success: false, error: error.message };
  }
};

// Obtener todas las necesidades
export const getAllNeeds = async () => {
  try {
    const querySnapshot = await getDocs(needsCollection);
    const needs = [];
    querySnapshot.forEach((doc) => {
      needs.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: needs };
  } catch (error) {
    console.error('Error al obtener necesidades:', error);
    return { success: false, error: error.message };
  }
};

// Actualizar una necesidad
export const updateNeed = async (id, updatedData) => {
  try {
    const needRef = doc(db, 'needs', id);
    await updateDoc(needRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar necesidad:', error);
    return { success: false, error: error.message };
  }
};

// Eliminar una necesidad
export const deleteNeed = async (id) => {
  try {
    await deleteDoc(doc(db, 'needs', id));
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar necesidad:', error);
    return { success: false, error: error.message };
  }
};

export { db };
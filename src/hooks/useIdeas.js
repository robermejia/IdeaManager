import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  writeBatch,
  getDocs
} from 'firebase/firestore';

export function useIdeas(user) {
  const [ideas, setIdeas] = useState([]);
  const [trashedIdeas, setTrashedIdeas] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeFolderId, setActiveFolderId] = useState('1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIdeas([]);
      setTrashedIdeas([]);
      setFolders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const userId = user.uid;

    // Suscribirse a carpetas
    const foldersQuery = query(
      collection(db, 'folders'),
      where('userId', '==', userId)
    );

    const unsubscribeFolders = onSnapshot(foldersQuery, (snapshot) => {
      const foldersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (foldersData.length === 0) {
        addFolder('General', userId);
      } else {
        setFolders(foldersData);
        // Solo redirigir al primer folder si no hay ninguno seleccionado Y
        // el usuario no está en la vista general (null = todas las ideas)
        if (activeFolderId !== null && !foldersData.find(f => f.id === activeFolderId)) {
          setActiveFolderId(foldersData[0].id);
        }
      }
    }, (error) => {
      console.error("Error en el listener de carpetas:", error);
      setLoading(false);
    });

    // Suscribirse a TODAS las ideas del usuario y separarlas en activas y papelera
    const ideasQuery = query(
      collection(db, 'ideas'),
      where('userId', '==', userId)
    );

    const unsubscribeIdeas = onSnapshot(ideasQuery, (snapshot) => {
      const allIdeas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate()?.toISOString() || null,
        deletedAt: doc.data().deletedAt?.toDate()?.toISOString() || null,
      }));

      // Ideas activas (no eliminadas)
      const active = allIdeas
        .filter(idea => !idea.deleted)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Ideas en papelera
      const trashed = allIdeas
        .filter(idea => idea.deleted === true)
        .sort((a, b) => new Date(b.deletedAt || b.createdAt) - new Date(a.deletedAt || a.createdAt));

      setIdeas(active);
      setTrashedIdeas(trashed);
      setLoading(false);
    }, (error) => {
      console.error("Error en el listener de ideas:", error);
      setLoading(false);
    });

    return () => {
      unsubscribeFolders();
      unsubscribeIdeas();
    };
  }, [user]);

  const addIdea = async (idea) => {
    if (!user) throw new Error('No hay usuario autenticado');
    const docData = {
      ...idea,
      userId: user.uid,
      completed: false,
      deleted: false,
      createdAt: serverTimestamp(),
    };
    try {
      const ref = await addDoc(collection(db, 'ideas'), docData);
      console.log('[addIdea] ✅ Guardado con ID:', ref.id);
    } catch (error) {
      console.error('[addIdea] ❌ Error de Firestore:', error.code, error.message);
      throw error;
    }
  };

  const updateIdea = async (id, updates) => {
    try {
      const ideaRef = doc(db, 'ideas', id);
      await updateDoc(ideaRef, { ...updates, updatedAt: serverTimestamp() });
    } catch (error) {
      console.error("Error updating idea: ", error);
      throw error;
    }
  };

  // Soft delete: manda la idea a la papelera
  const deleteIdea = async (id) => {
    try {
      await updateDoc(doc(db, 'ideas', id), {
        deleted: true,
        deletedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error soft-deleting idea: ", error);
      throw error;
    }
  };

  // Restaurar idea desde la papelera
  const restoreIdea = async (id) => {
    try {
      await updateDoc(doc(db, 'ideas', id), {
        deleted: false,
        deletedAt: null,
      });
    } catch (error) {
      console.error("Error restoring idea: ", error);
      throw error;
    }
  };

  // Eliminar permanentemente UNA idea
  const permanentDeleteIdea = async (id) => {
    try {
      await deleteDoc(doc(db, 'ideas', id));
    } catch (error) {
      console.error("Error permanently deleting idea: ", error);
      throw error;
    }
  };

  // Vaciar papelera: eliminar permanentemente TODAS las ideas eliminadas
  const emptyTrash = async () => {
    try {
      const batch = writeBatch(db);
      trashedIdeas.forEach(idea => {
        batch.delete(doc(db, 'ideas', idea.id));
      });
      await batch.commit();
    } catch (error) {
      console.error("Error emptying trash: ", error);
      throw error;
    }
  };

  const addFolder = async (name, forcedUserId) => {
    const userId = forcedUserId || user?.uid;
    if (!userId) throw new Error('No hay usuario autenticado');
    const docData = { name, userId, icon: 'Folder', createdAt: serverTimestamp() };
    try {
      const ref = await addDoc(collection(db, 'folders'), docData);
      console.log('[addFolder] ✅ Guardado con ID:', ref.id);
    } catch (error) {
      console.error('[addFolder] ❌ Error de Firestore:', error.code, error.message);
      throw error;
    }
  };

  const deleteFolder = async (id) => {
    try {
      await deleteDoc(doc(db, 'folders', id));
    } catch (error) {
      console.error("Error deleting folder: ", error);
      throw error;
    }
  };

  const renameFolder = async (id, newName) => {
    try {
      await updateDoc(doc(db, 'folders', id), { name: newName });
    } catch (error) {
      console.error("Error renaming folder: ", error);
      throw error;
    }
  };

  return {
    ideas,
    trashedIdeas,
    folders,
    activeFolderId,
    setActiveFolderId,
    addIdea,
    updateIdea,
    deleteIdea,
    restoreIdea,
    permanentDeleteIdea,
    emptyTrash,
    addFolder,
    deleteFolder,
    renameFolder,
    loading
  };
}

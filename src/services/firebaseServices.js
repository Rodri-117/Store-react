import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const getProducts = async () => {
    const itemListRef = collection(db, 'itemList');
    const snapshot = await getDocs(itemListRef);
    const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return products;
};

export const getProductsByIds = async (ids) => {
    const promises = ids.map(async (id) => {
        const docRef = doc(db, 'itemList', id);
        const snap = await getDoc(docRef);
        return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    });

    const products = await Promise.all(promises);
    return products.filter(p => p !== null);
};

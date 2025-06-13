import { db } from './firebase';
import { collection, addDoc, Timestamp, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { logActivity } from './logActivity';

export interface ProductData {
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  TotalReviews: number;
  isNew: boolean;
  isSale: boolean;
  inStock: boolean;
  stockCount: number;
  estimatedDelivery: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  careInstructions: string[];
  reviews: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

/**
 * Add a new product to Firestore
 */
export async function addProduct(data: ProductData): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...data,
      createdAt: Timestamp.now(),
    });

    // Log activity
    await logActivity({
      action: 'New product added',
      details: `${data.name} (${data.category})`,
      type: 'product',
    });

    return docRef.id;
  } catch (error) {
    throw new Error('Failed to add product: ' + (error as Error).message);
  }
}

/**
 * Delete a product by document ID
 */
export async function deleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product.');
  }
}

export async function getProductCount(): Promise<number> {
  try {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    return productsSnapshot.size;
  } catch (error) {
    console.error('Failed to fetch product count:', error);
    return 0;
  }
}

export async function getProductsAddedThisWeek(): Promise<number> {
  const sevenDaysAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('createdAt', '>=', sevenDaysAgo));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
}
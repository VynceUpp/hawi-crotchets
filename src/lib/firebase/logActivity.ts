import { db } from './firebase'; // or '@/lib/firebase/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore';

/**
 * Logs a user/admin activity in Firestore
 */
export async function logActivity({
  action,
  details,
  type,
}: {
  action: string;
  details: string;
  type: 'product' | 'order' | 'payment' | 'message' | 'customer';
}) {
  try {
    await addDoc(collection(db, 'activities'), {
      action,
      details,
      type,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  action: string;
  details: string;
  type: string;
  createdAt: any; // Firestore Timestamp
}

function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const q = query(
          collection(db, 'activities'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          ...(doc.data() as Activity),
          createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
        setActivities(data);
      } catch (err) {
        console.error('Error fetching activities:', err);
      }
    }

    fetchActivities();
  }, []);

  const getActivityIcon = (type: string) => {
    const icons = {
      order: '🛍️',
      product: '📦',
      message: '💬',
      payment: '💰',
      customer: '👤'
    };
    return icons[type as keyof typeof icons] || '📋';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500">No recent activity.</p>
        ) : (
          activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200"
            >
              <div className="text-2xl">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentActivity;

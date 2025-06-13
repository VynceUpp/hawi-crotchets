import { useEffect, useState } from 'react';
import { getProductCount, getProductsAddedThisWeek } from '@/lib/firebase/products';

function StatsCards() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsAddedThisWeek, setProductsAddedThisWeek] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      try {
        const count = await getProductCount();
        const addedThisWeek = await getProductsAddedThisWeek();
        setTotalProducts(count);
        setProductsAddedThisWeek(addedThisWeek);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-blue-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <span className="text-xs text-green-600 font-medium">+{productsAddedThisWeek} this week</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{totalProducts}</h3>
        <p className="text-sm text-gray-600">Total Products</p>
      </div>
    </div>
  );
}

export default StatsCards;

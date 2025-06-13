'use client';

import { useRouter } from 'next/navigation';

function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: 'Add New Product',
      icon: '📦',
      color: 'bg-blue-500 hover:bg-blue-600',
      link: '/admin/products/new',
    },
    {
      title: 'View Orders',
      icon: '📋',
      color: 'bg-green-500 hover:bg-green-600',
      link: '/admin/orders',
    },
    {
      title: 'Manage Inventory',
      icon: '📊',
      color: 'bg-purple-500 hover:bg-purple-600',
      link: '/admin/products',
    },
    {
      title: 'Customer Support',
      icon: '💬',
      color: 'bg-pink-500 hover:bg-pink-600',
      link: '/admin/support',
    },
    {
      title: 'Analytics',
      icon: '📈',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      link: '/admin/analytics',
    },
    {
      title: 'Settings',
      icon: '⚙️',
      color: 'bg-gray-500 hover:bg-gray-600',
      link: '/admin/settings',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => router.push(action.link)}
            className={`${action.color} text-white p-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg`}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="text-sm">{action.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;

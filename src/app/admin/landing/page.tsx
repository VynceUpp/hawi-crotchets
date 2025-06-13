// app/admin/landing/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function AdminLandingPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#dcc0b4] to-purple-300 px-10 py-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-center text-black mb-2 logo">Hawi Crochets</h1>
          <p className="text-sm text-indigo-100 text-center font-light">Administrative Dashboard</p>
        </div>

        {/* Content Section */}
        <div className="px-10 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to Your Management Hub
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
              Take control of your crochet business with our comprehensive administrative platform. 
              Monitor sales performance, manage your product catalog, track customer engagement, 
              and streamline your operations—all from one elegant dashboard.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="text-center p-6 rounded-xl bg-indigo-50 border border-indigo-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Product Management</h3>
              <p className="text-sm text-gray-600">Effortlessly add, edit, and organize your crochet collections</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-purple-50 border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Sales Analytics</h3>
              <p className="text-sm text-gray-600">Track performance and gain insights into your business growth</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-pink-50 border border-pink-100">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Platform Control</h3>
              <p className="text-sm text-gray-600">Customize settings and maintain your online presence</p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-amber-800">Secure Access Required</h4>
                <p className="text-sm text-amber-700 mt-1">
                  This administrative area requires proper authentication. Please ensure you have valid credentials before proceeding.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={handleNavigate}
              className=" cursor-pointer bg-gradient-to-r from-green-400 to-green-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-green-700 hover:to-green-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Access Admin Dashboard
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Powered by Firebase • Built with Next.js
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
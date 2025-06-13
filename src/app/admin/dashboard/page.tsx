'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import SalesChart from '@/components/dashboard/SalesChart';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';

export default function AdminDashboard() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/admin');
            } else {
                setUserEmail(user.email);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/admin');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
                {/* Dashboard Header */}
                <DashboardHeader userEmail={userEmail} onLogout={handleLogout} />

                {/* Main Dashboard Content */}
                <div className="px-6 pb-10">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Stats Cards Row */}
                        <StatsCards />

                        {/* Charts and Quick Actions Row */}
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <SalesChart />
                            </div>
                            <div className="lg:col-span-1">
                                <QuickActions />
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
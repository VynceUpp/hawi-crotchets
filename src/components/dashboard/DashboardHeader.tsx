import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

function DashboardHeader({ userEmail, onLogout }: { userEmail: string | null; onLogout: () => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-gradient-to-r from-[#dcc0b4] to-purple-300 px-4 sm:px-6 py-6 sm:py-8 mb-8 relative">
            <div className="max-w-7xl mx-auto">
                {/* Main header content */}
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black logo mb-1 sm:mb-2 truncate">
                            Hawi Crochets Dashboard
                        </h1>
                        <p className="text-sm sm:text-base text-gray-700 truncate">
                            Welcome back, {userEmail?.split('@')[0] || 'Admin'}
                        </p>
                    </div>

                    {/* Desktop controls */}
                    <div className="hidden md:flex items-center space-x-4 ml-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <span className="text-sm text-gray-700 whitespace-nowrap">
                                {new Date().toLocaleDateString()}
                            </span>
                        </div>
                        <button
                            onClick={() => router.push('/admin/products')}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-800 px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
                        >
                            Products
                        </button>

                        <button
                            onClick={onLogout}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-800 px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden ml-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-5 h-5 text-gray-800" />
                        ) : (
                            <Menu className="w-5 h-5 text-gray-800" />
                        )}
                    </button>
                </div>

                {/* Mobile dropdown menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-white/20">
                        <div className="space-y-3">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                                <span className="text-sm text-gray-700 block text-center">
                                    {new Date().toLocaleDateString()}
                                </span>
                            </div>
                            <button
                                onClick={() => router.push('/admin/products')}
                                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]"
                            >
                                Products
                            </button>
                            <button
                                onClick={() => {
                                    onLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardHeader;
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLoading } from '@/app/providers/LoadingProvider';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { setLoading } = useLoading();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/shop', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (href: string) => {
    setLoading(true);
    router.push(href);
  };

  return (
    <header className="bg-[#dcc0b4] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-4xl font-bold logo text-black tracking-tight">
              Hawi Crotchets
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-black hover:text-gray-700 transition-colors duration-200 font-medium cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black hover:bg-black/10"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-64 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <ul className="space-y-2 pt-2 border-t border-black/10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleNavClick(link.href);
                  }}
                  className="block px-3 py-2 text-black hover:bg-black/5 rounded-md transition-colors duration-200 font-medium"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

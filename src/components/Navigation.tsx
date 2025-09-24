'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Coffee, MapPin, Users, Home } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'HOME', icon: Home },
    { href: '/menu', label: 'MENU', icon: Coffee },
    { href: '/about', label: 'ABOUT', icon: Users },
    { href: '/contact', label: 'CONTACT', icon: MapPin },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-stroop-200 header-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-28 h-28 relative logo-container">
                     <Image
                       src="/logo-nieuw.png"
                       alt="House of Stroop Logo"
                       fill
                       className="object-contain rounded-lg"
                       priority
                       onError={(e) => {
                         // Fallback to coffee icon if logo fails to load
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.parentElement!.innerHTML = '<div class="w-28 h-28 bg-stroop-500 rounded-lg flex items-center justify-center"><svg class="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 3H4v10a2 2 0 002 2h8a2 2 0 002-2V5h4V3zM6 19h12v2H6v-2z"/></svg></div>';
                       }}
                     />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-stroop-700 hover:text-stroop-800 transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-stroop-700 hover:text-stroop-800 hover:bg-stroop-200/50 transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-stroop-200 header-bg animate-fade-in-up">
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 text-stroop-700 hover:text-stroop-800 hover:bg-stroop-200/50 p-3 rounded-lg transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

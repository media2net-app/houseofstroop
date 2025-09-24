'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  Image, 
  Instagram, 
  Home, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface DashboardStats {
  menuCategories: number;
  menuItems: number;
  instagramPosts: number;
  images: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    menuCategories: 0,
    menuItems: 0,
    instagramPosts: 0,
    images: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      title: 'Menu Management',
      description: 'Manage menu categories, sections, and items',
      icon: Menu,
      href: '/admin/menu',
      color: 'bg-blue-500',
      stats: `${stats.menuCategories} categories, ${stats.menuItems} items`
    },
    {
      title: 'Hero Content',
      description: 'Edit homepage hero section',
      icon: Home,
      href: '/admin/hero',
      color: 'bg-green-500',
      stats: 'Homepage content'
    },
    {
      title: 'Instagram Posts',
      description: 'Manage Instagram feed posts',
      icon: Instagram,
      href: '/admin/instagram',
      color: 'bg-pink-500',
      stats: `${stats.instagramPosts} posts`
    },
    {
      title: 'Image Gallery',
      description: 'Upload and manage images',
      icon: Image,
      href: '/admin/images',
      color: 'bg-purple-500',
      stats: `${stats.images} images`
    },
    {
      title: 'Page Content',
      description: 'Edit page content and text',
      icon: Settings,
      href: '/admin/pages',
      color: 'bg-orange-500',
      stats: 'Page content'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stroop-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-stroop-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stroop-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stroop-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-stroop-700">House of Stroop CMS</h1>
              <p className="text-stroop-600">Content Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center space-x-2 text-stroop-600 hover:text-stroop-700"
              >
                <Eye className="w-4 h-4" />
                <span>View Site</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-stroop-600 hover:text-stroop-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Menu className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-stroop-600">Menu Categories</p>
                <p className="text-2xl font-bold text-stroop-700">{stats.menuCategories}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-stroop-600">Menu Items</p>
                <p className="text-2xl font-bold text-stroop-700">{stats.menuItems}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Instagram className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-stroop-600">Instagram Posts</p>
                <p className="text-2xl font-bold text-stroop-700">{stats.instagramPosts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-stroop-600">Images</p>
                <p className="text-2xl font-bold text-stroop-700">{stats.images}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-6 group"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-stroop-700 group-hover:text-stroop-600">
                    {item.title}
                  </h3>
                  <p className="text-stroop-600 text-sm mt-1">
                    {item.description}
                  </p>
                  <p className="text-stroop-500 text-xs mt-2">
                    {item.stats}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-stroop-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/menu?action=add"
              className="flex items-center space-x-3 p-4 border border-stroop-200 rounded-lg hover:bg-stroop-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-stroop-500" />
              <span className="text-stroop-700">Add Menu Item</span>
            </Link>
            <Link
              href="/admin/instagram?action=add"
              className="flex items-center space-x-3 p-4 border border-stroop-200 rounded-lg hover:bg-stroop-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-stroop-500" />
              <span className="text-stroop-700">Add Instagram Post</span>
            </Link>
            <Link
              href="/admin/images?action=upload"
              className="flex items-center space-x-3 p-4 border border-stroop-200 rounded-lg hover:bg-stroop-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-stroop-500" />
              <span className="text-stroop-700">Upload Image</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

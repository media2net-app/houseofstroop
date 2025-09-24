'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

export default function NewMenuItem() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    note: '',
    isPopular: false,
    isActive: true,
    categoryId: '',
    sectionId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/menu/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/admin/menu');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create item');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stroop-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stroop-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/menu"
                className="flex items-center space-x-2 text-stroop-600 hover:text-stroop-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Menu</span>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-stroop-700">Add New Menu Item</h1>
                <p className="text-stroop-600">Create a new menu item</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stroop-700 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                  placeholder="Enter item name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stroop-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                  placeholder="e.g., 17,95"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stroop-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                placeholder="Enter item description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stroop-700 mb-2">
                Note
              </label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                placeholder="e.g., upon availability"
              />
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-stroop-700">Popular Item</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-stroop-700">Active</span>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/menu"
                className="flex items-center space-x-2 px-4 py-2 border border-stroop-300 text-stroop-700 rounded-lg hover:bg-stroop-50"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-stroop-600 text-white rounded-lg hover:bg-stroop-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Creating...' : 'Create Item'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';

interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  isActive: boolean;
}

export default function HeroManagement() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const response = await fetch('/api/admin/hero');
      if (response.ok) {
        const data = await response.json();
        setHeroContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch hero content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroContent)
      });

      if (response.ok) {
        const data = await response.json();
        setHeroContent(data);
        alert('Hero content updated successfully!');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update hero content');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

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
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-2 text-stroop-600 hover:text-stroop-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-stroop-700">Hero Content</h1>
                <p className="text-stroop-600">Manage homepage hero section</p>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center space-x-2 text-stroop-600 hover:text-stroop-700"
            >
              <Eye className="w-4 h-4" />
              <span>View Site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stroop-700 mb-2">
                Hero Title *
              </label>
              <input
                type="text"
                required
                value={heroContent?.title || ''}
                onChange={(e) => setHeroContent(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                placeholder="Enter hero title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stroop-700 mb-2">
                Hero Subtitle *
              </label>
              <textarea
                required
                value={heroContent?.subtitle || ''}
                onChange={(e) => setHeroContent(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
                rows={4}
                className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                placeholder="Enter hero subtitle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stroop-700 mb-2">
                Background Image URL *
              </label>
              <input
                type="url"
                required
                value={heroContent?.backgroundImage || ''}
                onChange={(e) => setHeroContent(prev => prev ? { ...prev, backgroundImage: e.target.value } : null)}
                className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                placeholder="/highlights/_OP24522.jpg"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={heroContent?.isActive || false}
                  onChange={(e) => setHeroContent(prev => prev ? { ...prev, isActive: e.target.checked } : null)}
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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center space-x-2 px-6 py-2 bg-stroop-600 text-white rounded-lg hover:bg-stroop-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Save,
  X
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  isActive: boolean;
  order: number;
}

export default function InstagramManagement() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: '',
    caption: '',
    permalink: '',
    isActive: true,
    order: 0
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/instagram');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePostActive = async (postId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/instagram/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });

      if (response.ok) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? { ...post, isActive } : post
        ));
      }
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/admin/instagram/${postId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPosts(prev => prev.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({ imageUrl: '', caption: '', permalink: '', isActive: true, order: 0 });
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to create post:', error);
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
                <h1 className="text-3xl font-bold text-stroop-700">Instagram Management</h1>
                <p className="text-stroop-600">Manage Instagram feed posts</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-stroop-600 text-white px-4 py-2 rounded-lg hover:bg-stroop-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Post</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-stroop-700 mb-4">Add New Instagram Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload
                  label="Post Image"
                  currentImage={formData.imageUrl}
                  onImageUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                />
                <div>
                  <label className="block text-sm font-medium text-stroop-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stroop-700 mb-2">
                  Caption *
                </label>
                <textarea
                  required
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                  placeholder="Enter post caption"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stroop-700 mb-2">
                  Permalink
                </label>
                <input
                  type="url"
                  value={formData.permalink}
                  onChange={(e) => setFormData({ ...formData, permalink: e.target.value })}
                  className="w-full px-3 py-2 border border-stroop-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stroop-500"
                  placeholder="https://www.instagram.com/p/example/"
                />
              </div>
              <div className="flex items-center space-x-4">
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
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex items-center space-x-2 px-4 py-2 border border-stroop-300 text-stroop-700 rounded-lg hover:bg-stroop-50"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-stroop-600 text-white rounded-lg hover:bg-stroop-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Create Post</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-square bg-stroop-100 flex items-center justify-center">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-stroop-600 mb-3 line-clamp-2">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePostActive(post.id, !post.isActive)}
                      className={`p-2 rounded ${
                        post.isActive 
                          ? 'text-green-600 hover:bg-green-100' 
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {post.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setEditingPost(post.id)}
                      className="p-2 text-stroop-600 hover:text-stroop-700 hover:bg-stroop-100 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-stroop-500">Order: {post.order}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stroop-500">No Instagram posts found</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 text-stroop-600 hover:text-stroop-700"
            >
              Add your first post
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

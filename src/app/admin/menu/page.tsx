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
  ChevronDown,
  ChevronRight,
  Save,
  X
} from 'lucide-react';

interface MenuCategory {
  id: string;
  title: string;
  order: number;
  isActive: boolean;
  sections: MenuSection[];
}

interface MenuSection {
  id: string;
  title: string;
  order: number;
  isActive: boolean;
  categoryId: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  price?: string;
  description?: string;
  note?: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
  sectionId: string;
}

export default function MenuManagement() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/menu');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        // Auto-expand first category
        if (data.length > 0) {
          setExpandedCategories(new Set([data[0].id]));
        }
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleItemActive = async (itemId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/menu/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });

      if (response.ok) {
        setCategories(prev => prev.map(category => ({
          ...category,
          sections: category.sections.map(section => ({
            ...section,
            items: section.items.map(item => 
              item.id === itemId ? { ...item, isActive } : item
            )
          }))
        })));
      }
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/admin/menu/items/${itemId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCategories(prev => prev.map(category => ({
          ...category,
          sections: category.sections.map(section => ({
            ...section,
            items: section.items.filter(item => item.id !== itemId)
          }))
        })));
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
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
                <h1 className="text-3xl font-bold text-stroop-700">Menu Management</h1>
                <p className="text-stroop-600">Manage your menu categories, sections, and items</p>
              </div>
            </div>
            <Link
              href="/admin/menu/new"
              className="flex items-center space-x-2 bg-stroop-600 text-white px-4 py-2 rounded-lg hover:bg-stroop-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow">
              {/* Category Header */}
              <div className="p-6 border-b border-stroop-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 hover:bg-stroop-100 rounded"
                    >
                      {expandedCategories.has(category.id) ? (
                        <ChevronDown className="w-5 h-5 text-stroop-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-stroop-600" />
                      )}
                    </button>
                    <h2 className="text-2xl font-bold text-stroop-700">{category.title}</h2>
                    <span className="bg-stroop-100 text-stroop-600 px-2 py-1 rounded-full text-sm">
                      {category.sections.reduce((total, section) => total + section.items.length, 0)} items
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingCategory(category.id)}
                      className="p-2 text-stroop-600 hover:text-stroop-700 hover:bg-stroop-100 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Content */}
              {expandedCategories.has(category.id) && (
                <div className="p-6">
                  <div className="space-y-6">
                    {category.sections.map((section) => (
                      <div key={section.id} className="border border-stroop-200 rounded-lg">
                        {/* Section Header */}
                        <div className="p-4 bg-stroop-50 border-b border-stroop-200">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-stroop-700">{section.title}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-stroop-600">
                                {section.items.length} items
                              </span>
                              <button
                                onClick={() => setEditingSection(section.id)}
                                className="p-1 text-stroop-600 hover:text-stroop-700 hover:bg-stroop-200 rounded"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Section Items */}
                        <div className="p-4">
                          <div className="space-y-3">
                            {section.items.map((item) => (
                              <div
                                key={item.id}
                                className={`flex items-center justify-between p-3 rounded-lg border ${
                                  item.isActive 
                                    ? 'bg-white border-stroop-200' 
                                    : 'bg-stroop-50 border-stroop-100'
                                }`}
                              >
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <h4 className="font-semibold text-stroop-700">{item.name}</h4>
                                    {item.isPopular && (
                                      <span className="bg-stroop-500 text-white px-2 py-1 rounded-full text-xs">
                                        Popular
                                      </span>
                                    )}
                                    {!item.isActive && (
                                      <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs">
                                        Inactive
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className="text-sm text-stroop-600 mt-1">{item.description}</p>
                                  )}
                                  {item.note && (
                                    <p className="text-xs text-stroop-500 mt-1 italic">{item.note}</p>
                                  )}
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  {item.price && (
                                    <span className="font-bold text-stroop-600">{item.price}</span>
                                  )}
                                  
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => toggleItemActive(item.id, !item.isActive)}
                                      className={`p-2 rounded ${
                                        item.isActive 
                                          ? 'text-green-600 hover:bg-green-100' 
                                          : 'text-gray-400 hover:bg-gray-100'
                                      }`}
                                    >
                                      {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    
                                    <button
                                      onClick={() => setEditingItem(item.id)}
                                      className="p-2 text-stroop-600 hover:text-stroop-700 hover:bg-stroop-100 rounded"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    
                                    <button
                                      onClick={() => deleteItem(item.id)}
                                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {section.items.length === 0 && (
                              <div className="text-center py-8 text-stroop-500">
                                No items in this section
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

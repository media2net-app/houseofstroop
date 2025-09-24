'use client';

import { useState, useEffect } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  isActive: boolean;
  order: number;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from database
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/instagram');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch Instagram posts:', error);
        // Fallback to static images
        setPosts([
          {
            id: '1',
            imageUrl: '/highlights/_OP15078.jpg',
            caption: 'Fresh stroopwafels daily! Made with love in Curaçao 🧇✨',
            permalink: 'https://www.instagram.com/p/example1/',
            isActive: true,
            order: 0
          },
          {
            id: '2',
            imageUrl: '/highlights/_OP14687.jpg',
            caption: 'Perfect coffee & stroopwafel combo ☕ The best way to start your day!',
            permalink: 'https://www.instagram.com/p/example2/',
            isActive: true,
            order: 1
          },
          {
            id: '3',
            imageUrl: '/highlights/_OP14946.jpg',
            caption: 'Behind the scenes at House of Stroop! Our bakers at work 💕',
            permalink: 'https://www.instagram.com/p/example3/',
            isActive: true,
            order: 2
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="aspect-square bg-stroop-100"></div>
            <div className="p-4">
              <div className="h-4 bg-stroop-100 rounded mb-2"></div>
              <div className="h-3 bg-stroop-100 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift animate-fade-in-up"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="aspect-square relative group overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.caption}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <Instagram className="w-8 h-8 text-white" />
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-stroop-600 line-clamp-2 mb-3">
              {post.caption}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-stroop-500" />
                <MessageCircle className="w-4 h-4 text-stroop-500" />
              </div>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-stroop-500 hover:text-stroop-600 transition-colors"
              >
                View on Instagram
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;

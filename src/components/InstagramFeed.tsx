'use client';

import { useState, useEffect } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface InstagramPost {
  id: string;
  media_url: string;
  caption: string;
  permalink: string;
  media_type: string;
  timestamp: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - in production, you'd fetch from Instagram API
  useEffect(() => {
    const mockPosts: InstagramPost[] = [
      {
        id: '1',
        media_url: '/highlights/_OP15078.jpg',
        caption: 'Fresh stroopwafels daily! Made with love in Curaçao 🧇✨',
        permalink: 'https://www.instagram.com/p/example1/',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        media_url: '/highlights/_OP14687.jpg',
        caption: 'Perfect coffee & stroopwafel combo ☕ The best way to start your day!',
        permalink: 'https://www.instagram.com/p/example2/',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString()
      },
      {
        id: '3',
        media_url: '/highlights/_OP14946.jpg',
        caption: 'Behind the scenes at House of Stroop! Our bakers at work 💕',
        permalink: 'https://www.instagram.com/p/example3/',
        media_type: 'IMAGE',
        timestamp: new Date().toISOString()
      }
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
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
              src={post.media_url}
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

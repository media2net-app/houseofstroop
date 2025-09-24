import Navigation from '@/components/Navigation';
import InstagramFeed from '@/components/InstagramFeed';
import Preloader from '@/components/Preloader';
import { Coffee, Heart, Star, MapPin, Clock, Users, BookOpen, ChevronDown, Instagram, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Preloader />
      <Navigation />
      
      {/* Hero Section with Header Background */}
      <section className="pt-36 pb-32 hero-background relative min-h-screen flex items-center">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in-up">
                BUT FIRST COFFEE, WITH A STROOPWAFEL.
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                Discover authentic, freshly made stroopwafels, delicious coffee to go, and fun workshops in the vibrant <strong>Kurá Hulanda Village</strong>. Stop by for a sweet treat or join us to learn the art of making your own stroopwafels!
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-white animate-bounce">
            <span className="text-sm mb-2 font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-stroop-700 mb-8 animate-fade-in-up">
            THE FIRST STROOPWAFEL SHOP ON CURAÇAO.
          </h2>
        </div>
      </section>

      {/* Three Features Section */}
      <section className="py-20 bg-stroop-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Our Stroopwafels */}
            <div className="text-center hover-lift animate-fade-in-up">
              <div className="mb-6">
                <Image
                  src="/highlights/_OP15078.jpg"
                  alt="Fresh stroopwafels with toppings"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-stroop-700 mb-4">OUR STROOPWAFELS</h3>
              <p className="text-lg text-stroop-600 leading-relaxed">
                Taste the magic of our authentic, freshly baked stroopwafels. Crispy, gooey, and full of flavor—classic crumbs or topped with your favorite sweet treats. Every bite is a little moment of happiness!
              </p>
            </div>

            {/* Our Coffee */}
            <div className="text-center hover-lift animate-fade-in-up animation-delay-200">
              <div className="mb-6">
                <Image
                  src="/highlights/_OP14687.jpg"
                  alt="Fresh coffee brewing"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-stroop-700 mb-4">OUR COFFEE</h3>
              <p className="text-lg text-stroop-600 leading-relaxed">
                Wake up your senses with our fresh, expertly brewed coffee. From classic espresso to creamy lattes and seasonal specials, there's a perfect cup for every mood. Take it to go or savor it on the spot!
              </p>
            </div>

            {/* Workshops */}
            <div className="text-center hover-lift animate-fade-in-up animation-delay-400">
              <div className="mb-6">
                <Image
                  src="/highlights/_OP14946.jpg"
                  alt="Coffee beans and workshop materials"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-stroop-700 mb-4">WORKSHOPS (COMING SOON!)</h3>
              <p className="text-lg text-stroop-600 leading-relaxed">
                Get hands-on and learn the art of stroopwafel making! Our fun, interactive workshops let you create your own sweet treats while discovering the secrets behind this Dutch delight. Perfect for all ages!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-stroop-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in-up">
            THEY SAY WE ARE THE BEST<br />
            STROOPWAFEL & COFFEE SHOP
          </h2>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="py-20 bg-stroop-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-stroop-700 mb-8">
                WE OPEN OUR DOORS FROM TUESDAY TILL SATURDAY AT 09:00. COME SAY HELLO!
              </h2>
              <p className="text-lg text-stroop-600 leading-relaxed">
                Located in the heart of Otrobanda, House of Stroop is part of the vibrant <strong>Kurá Hulanda Village</strong>. Surrounded by colorful colonial architecture, cozy streets, and a lively atmosphere, it's the perfect spot to enjoy a sweet break.
              </p>
            </div>
            
            {/* Image Content */}
            <div className="animate-fade-in-up animation-delay-200">
              <Image
                src="/highlights/_OP24522.jpg"
                alt="House of Stroop interior - bustling cafe with customers and barista"
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Stroopwafels Section */}
      <section className="py-20 bg-stroop-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Content */}
            <div className="animate-fade-in-up">
              <Image
                src="/highlights/_OP14749.jpg"
                alt="House of Stroop cafe interior with customers and modern design"
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            {/* Text Content */}
            <div className="animate-fade-in-up animation-delay-200">
              <h2 className="text-4xl md:text-5xl font-bold text-stroop-700 mb-8">
                TRY OUR FRESH STROOPWAFELS. THEY WILL NOT DISAPPOINT!
              </h2>
              <div className="space-y-6 text-lg text-stroop-600 leading-relaxed">
                <p>
                  The stroopwafel is a true Dutch classic with a history that goes back to the late 18th century in the city of Gouda. Legend has it that a baker created the first stroopwafel using leftover crumbs and sweet syrup—an inventive way to turn simple ingredients into something extraordinary.
                </p>
                <p>
                  Over time, this humble treat became a beloved snack across the Netherlands, enjoyed with a warm cup of coffee or tea. The secret lies in its perfect balance: two thin, crisp waffles held together by a rich caramel-like syrup.
                </p>
                <p>
                  Today, the stroopwafel has traveled far beyond its Dutch roots, bringing joy to people all over the world. At House of Stroop, we honor this tradition by baking them fresh, just as they were meant to be—authentic, warm and made with love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-stroop-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
              The stroopwafel is a true Dutch classic with a history that goes back to the late 18th century in the city of Gouda. Legend has it that a baker created the first stroopwafel using leftover crumbs and sweet syrup—an inventive way to turn simple ingredients into something extraordinary.
            </p>
            <br />
            <p className="text-lg text-stroop-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Over time, this humble treat became a beloved snack across the Netherlands, enjoyed with a warm cup of coffee or tea. The secret lies in its perfect balance: two thin, crisp waffles held together by a rich caramel-like syrup.
            </p>
            <br />
            <p className="text-lg text-stroop-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Today, the stroopwafel has traveled far beyond its Dutch roots, bringing joy to people all over the world. At House of Stroop, we honor this tradition by baking them fresh, just as they were meant to be—authentic, warm and made with love.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-stroop-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-stroop-700 mb-8 animate-fade-in-up">
              FOLLOW OUR JOURNEY
            </h2>
            <p className="text-lg text-stroop-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              See our latest stroopwafels, behind-the-scenes moments, and customer stories on Instagram!
            </p>
          </div>
          
          {/* Instagram Feed */}
          <InstagramFeed />

          {/* Instagram CTA */}
          <div className="text-center animate-fade-in-up animation-delay-600">
            <Link
              href="https://www.instagram.com/houseofstroop/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover-scale"
            >
              <Instagram className="w-6 h-6" />
              <span>Follow @houseofstroop</span>
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final Visit Section */}
      <section className="py-20 bg-stroop-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in-up">
            VISIT HOUSE OF STROOP
          </h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Located in the heart of Otrobanda, House of Stroop is part of the vibrant <strong>Kurá Hulanda Village</strong>. Surrounded by colorful colonial architecture, cozy streets, and a lively atmosphere, it's the perfect spot to enjoy a sweet break.
          </p>
          <button className="bg-white text-stroop-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-stroop-50 transition-all duration-300 hover-scale animate-fade-in-up animation-delay-400">
            FIND US ON MAPS
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stroop-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="w-20 h-20 relative logo-container">
                         <Image
                           src="/logo-nieuw.png"
                           alt="House of Stroop Logo"
                           fill
                           className="object-contain rounded-lg"
                         />
                </div>
              </div>
              <p className="text-stroop-200 text-sm">
                The first stroopwafel shop on Curaçao. Fresh, authentic, and made with love.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/" className="block text-stroop-200 hover:text-white transition-colors">Home</Link>
                <Link href="/menu" className="block text-stroop-200 hover:text-white transition-colors">Menu</Link>
                <Link href="/about" className="block text-stroop-200 hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="block text-stroop-200 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <Link
                  href="https://www.instagram.com/houseofstroop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stroop-600 rounded-full flex items-center justify-center hover:bg-stroop-500 transition-colors hover-scale"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.facebook.com/houseofstroop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stroop-600 rounded-full flex items-center justify-center hover:bg-stroop-500 transition-colors hover-scale"
                >
                  <span className="text-sm font-bold">f</span>
                </Link>
              </div>
              <p className="text-stroop-200 text-sm mt-4">
                Located in Kurá Hulanda Village<br />
                Otrobanda, Curaçao
              </p>
            </div>
          </div>
          
          <div className="border-t border-stroop-700 mt-8 pt-8 text-center">
            <p className="text-stroop-300 text-sm">
              © 2024 House of Stroop. All rights reserved. | Made with ❤️ in Curaçao
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

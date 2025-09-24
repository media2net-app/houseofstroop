import Navigation from '@/components/Navigation';
import { Coffee, Star, Clock, Euro, Heart, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function Menu() {
  // Fetch menu data from database
  const menuCategories = await prisma.menuCategory.findMany({
    where: { isActive: true },
    include: {
      sections: {
        where: { isActive: true },
        include: {
          items: {
            where: { isActive: true },
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { order: 'asc' }
  });

  // Use database data or fallback
  const categories = menuCategories.length > 0 ? menuCategories : [];

  return (
    <main className="min-h-screen bg-stroop-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-stroop-100 via-stroop-200 to-stroop-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-stroop-700 mb-6">
              Our Menu
            </h1>
            <p className="text-xl text-stroop-600 max-w-2xl mx-auto">
              Discover our delicious stroopwafels and perfect coffee. 
              Every bite is a journey to authentic Dutch flavors!
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="mb-20 animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-stroop-700 mb-12 text-center">
                {category.title}
              </h2>
              
              <div className="space-y-12">
                {category.sections.map((section, sectionIndex) => (
                  <div
                    key={section.title}
                    className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in-up"
                    style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                  >
                    <h3 className="text-2xl font-bold text-stroop-700 mb-6 text-center">
                      {section.title}
                    </h3>
                    
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={item.name}
                          className={`flex items-center justify-between py-3 px-4 rounded-lg hover:bg-stroop-50 transition-colors animate-fade-in-left ${
                            item.isDescription ? 'bg-stroop-100' : ''
                          }`}
                          style={{ animationDelay: `${itemIndex * 0.05}s` }}
                        >
                          <div className="flex-1">
                            <h4 className={`font-semibold ${
                              item.isDescription ? 'text-stroop-600 text-sm italic' : 'text-stroop-700 text-lg'
                            }`}>
                              {item.name}
                            </h4>
                            {item.note && (
                              <p className="text-sm text-stroop-500 mt-1">
                                {item.note}
                              </p>
                            )}
                          </div>
                          
                          {item.price && (
                            <div className="flex items-center space-x-3">
                              {item.isPopular && (
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-stroop-500 fill-current" />
                                  <span className="ml-1 text-xs text-stroop-500">Popular</span>
                                </div>
                              )}
                              <span className="text-lg font-bold text-stroop-600">
                                {item.price}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-16 bg-stroop-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6">
              Special Offer
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Stroopwafel + Coffee Combo
              </h3>
              <p className="text-stroop-100 mb-4 text-lg">
                Enjoy a classic stroopwafel with a perfect cup of coffee
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-3xl font-bold text-white">€4.50</span>
                <span className="text-stroop-200 line-through">€6.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Info */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <p className="text-stroop-600 text-sm">
              Prices are including OB and shown in XCG
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

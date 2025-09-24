import Navigation from '@/components/Navigation';
import { Coffee, Star, Clock, Euro, Heart, Sparkles } from 'lucide-react';

export default function Menu() {
  const menuCategories = [
    {
      title: "Stroopwafels",
      sections: [
        {
          sectionTitle: "FRESH STROOPWAFELS XL",
          items: [
            {
              name: "Fresh Classic Stroopwafel XL",
              price: "17,95",
              popular: true
            },
            {
              name: "Fresh Classic Stroopwafel XL Glutenfree",
              price: "21,95",
              note: "upon availability"
            },
            {
              name: "Stroopwafel \"kruimels\" with stroop",
              price: "11,95"
            }
          ]
        },
        {
          sectionTitle: "FRESH STROOPWAFEL XL TOPPINGS",
          items: [
            {
              name: "Choco",
              price: "2,50"
            },
            {
              name: "ChocoNuts",
              price: "4,50"
            },
            {
              name: "Bounty",
              price: "4,50"
            },
            {
              name: "Oreo",
              price: "4,50"
            },
            {
              name: "Confetti",
              price: "4,50"
            }
          ]
        },
        {
          sectionTitle: "DIPPED STROOPWAFELS REGULAR SIZE",
          items: [
            {
              name: "Classic",
              price: "6,50"
            },
            {
              name: "Choco",
              price: "8,50"
            },
            {
              name: "ChocoNuts, Bounty, Oreo or Confetti",
              price: "9,50"
            }
          ]
        },
        {
          sectionTitle: "OTHER THAN STROOPWAFELS",
          items: [
            {
              name: "Chewy Cookie",
              price: "6,-"
            },
            {
              name: "Dutch \"Saucijzenbroodje\"",
              price: "6,50"
            },
            {
              name: "Not So Much Sugar Muffin",
              price: "8,50"
            }
          ]
        }
      ]
    },
    {
      title: "Coffee & Drinks",
      sections: [
        {
          sectionTitle: "COFFEE FAVORITES",
          items: [
            {
              name: "Coffee",
              price: "6,-"
            },
            {
              name: "Espresso",
              price: "5,-"
            },
            {
              name: "Espresso Espresso",
              price: "6,-"
            },
            {
              name: "Americano",
              price: "6,-"
            },
            {
              name: "Cappuccino",
              price: "7,-"
            },
            {
              name: "Latte",
              price: "8,-"
            },
            {
              name: "Cortado",
              price: "8,-"
            },
            {
              name: "Babyccino",
              price: "5,-"
            }
          ]
        },
        {
          sectionTitle: "HOT COFFEE SPECIALS",
          items: [
            {
              name: "Stroopwafel Latte",
              price: "14,50",
              popular: true
            },
            {
              name: "Pumpkin Spice Latte",
              price: "14,50"
            },
            {
              name: "Dirty Pumpkin Spice Latte",
              price: "16,00"
            },
            {
              name: "Chai Latte",
              price: "9,50"
            },
            {
              name: "Dirty Chai Latte",
              price: "12,-"
            },
            {
              name: "Matcha Latte",
              price: "9,50"
            },
            {
              name: "Dirty Matcha Latte",
              price: "12,-"
            }
          ]
        },
        {
          sectionTitle: "WHAT'S THE TEA?",
          items: [
            {
              name: "Ginger Orange",
              price: "7,50"
            },
            {
              name: "Fresh Mint",
              price: "7,50"
            },
            {
              name: "Hatsu Icetea",
              price: "7,-"
            }
          ]
        },
        {
          sectionTitle: "ICE ICE BABY",
          items: [
            {
              name: "Iced Latte",
              price: "11,50"
            },
            {
              name: "Iced Chai Latte",
              price: "13,50"
            },
            {
              name: "Iced Matcha Latte",
              price: "13,50"
            },
            {
              name: "Frappuccino",
              price: "13,50"
            },
            {
              name: "Oreo, Caramel or Chocolate",
              price: "+2,50",
              note: "additional charge"
            }
          ]
        }
      ]
    },
    {
      title: "Drinks & Shop",
      sections: [
        {
          sectionTitle: "WATER",
          items: [
            {
              name: "Hot Water",
              price: "4,-"
            },
            {
              name: "Water Still",
              price: "6,-"
            },
            {
              name: "Water Sparkling",
              price: "7,-"
            }
          ]
        },
        {
          sectionTitle: "ADD ONS",
          items: [
            {
              name: "Coco-, Almond- or Oatmilk",
              price: "2,50"
            },
            {
              name: "Extra Shot Coffee or Syrup",
              price: "2,50"
            },
            {
              name: "Whipped Cream",
              price: "2,50"
            }
          ]
        },
        {
          sectionTitle: "ICED SPECIALS",
          items: [
            {
              name: "Strawberry Matcha Latte",
              price: "15,50"
            },
            {
              name: "Stroopwafel Latte",
              price: "15,50"
            },
            {
              name: "Pumpkin Spice Latte",
              price: "16,50"
            }
          ]
        },
        {
          sectionTitle: "SLUSH",
          items: [
            {
              name: "Pink Lemonade",
              price: "8,-"
            },
            {
              name: "Slush Special",
              price: "8,50"
            }
          ]
        },
        {
          sectionTitle: "SHOP",
          items: [
            {
              name: "Discover old dutch candy, Delft Blue tiles & cans, bags of stroopwafels and more in our shop!",
              price: "",
              isDescription: true
            }
          ]
        }
      ]
    }
  ];

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
          {menuCategories.map((category, categoryIndex) => (
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
                    key={section.sectionTitle}
                    className="bg-white rounded-2xl p-8 shadow-lg animate-fade-in-up"
                    style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                  >
                    <h3 className="text-2xl font-bold text-stroop-700 mb-6 text-center">
                      {section.sectionTitle}
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
                              {item.popular && (
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

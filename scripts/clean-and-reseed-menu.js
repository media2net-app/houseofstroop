const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning and reseeding menu data...');

  // Delete all existing menu data
  await prisma.menuItem.deleteMany();
  await prisma.menuSection.deleteMany();
  await prisma.menuCategory.deleteMany();

  console.log('Cleaned existing menu data');

  // Create Stroopwafels category
  const stroopwafelsCategory = await prisma.menuCategory.create({
    data: {
      id: 'stroopwafels',
      title: 'Stroopwafels',
      order: 0,
      isActive: true
    }
  });

  // Create Coffee & Drinks category
  const coffeeCategory = await prisma.menuCategory.create({
    data: {
      id: 'coffee-drinks',
      title: 'Coffee & Drinks',
      order: 1,
      isActive: true
    }
  });

  // Create Drinks & Shop category
  const drinksShopCategory = await prisma.menuCategory.create({
    data: {
      id: 'drinks-shop',
      title: 'Drinks & Shop',
      order: 2,
      isActive: true
    }
  });

  // Stroopwafels sections and items
  const stroopwafelsSections = [
    {
      id: 'fresh-stroopwafels-xl',
      title: 'FRESH STROOPWAFELS XL',
      order: 0,
      items: [
        { name: 'Fresh Classic Stroopwafel XL', price: '17,95', isPopular: true },
        { name: 'Fresh Classic Stroopwafel XL Glutenfree', price: '21,95', note: 'upon availability' },
        { name: 'Stroopwafel "kruimels" with stroop', price: '11,95' }
      ]
    },
    {
      id: 'fresh-stroopwafel-xl-toppings',
      title: 'FRESH STROOPWAFEL XL TOPPINGS',
      order: 1,
      items: [
        { name: 'Choco', price: '2,50' },
        { name: 'ChocoNuts', price: '4,50' },
        { name: 'Bounty', price: '4,50' },
        { name: 'Oreo', price: '4,50' },
        { name: 'Confetti', price: '4,50' }
      ]
    },
    {
      id: 'dipped-stroopwafels-regular',
      title: 'DIPPED STROOPWAFELS REGULAR SIZE',
      order: 2,
      items: [
        { name: 'Classic', price: '6,50' },
        { name: 'Choco', price: '8,50' },
        { name: 'ChocoNuts, Bounty, Oreo or Confetti', price: '9,50' }
      ]
    },
    {
      id: 'other-than-stroopwafels',
      title: 'OTHER THAN STROOPWAFELS',
      order: 3,
      items: [
        { name: 'Chewy Cookie', price: '6,-' },
        { name: 'Dutch "Saucijzenbroodje"', price: '6,50' },
        { name: 'Not So Much Sugar Muffin', price: '8,50' }
      ]
    }
  ];

  // Coffee & Drinks sections and items
  const coffeeSections = [
    {
      id: 'coffee-favorites',
      title: 'COFFEE FAVORITES',
      order: 0,
      items: [
        { name: 'Coffee', price: '6,-' },
        { name: 'Espresso', price: '5,-' },
        { name: 'Espresso Espresso', price: '6,-' },
        { name: 'Americano', price: '6,-' },
        { name: 'Cappuccino', price: '7,-' },
        { name: 'Latte', price: '8,-' },
        { name: 'Cortado', price: '8,-' },
        { name: 'Babyccino', price: '5,-' }
      ]
    },
    {
      id: 'hot-coffee-specials',
      title: 'HOT COFFEE SPECIALS',
      order: 1,
      items: [
        { name: 'Stroopwafel Latte', price: '14,50', isPopular: true },
        { name: 'Pumpkin Spice Latte', price: '14,50' },
        { name: 'Dirty Pumpkin Spice Latte', price: '16,00' },
        { name: 'Chai Latte', price: '9,50' },
        { name: 'Dirty Chai Latte', price: '12,-' },
        { name: 'Matcha Latte', price: '9,50' },
        { name: 'Dirty Matcha Latte', price: '12,-' }
      ]
    },
    {
      id: 'whats-the-tea',
      title: 'WHAT\'S THE TEA?',
      order: 2,
      items: [
        { name: 'Ginger Orange', price: '7,50' },
        { name: 'Fresh Mint', price: '7,50' },
        { name: 'Hatsu Icetea', price: '7,-' }
      ]
    },
    {
      id: 'ice-ice-baby',
      title: 'ICE ICE BABY',
      order: 3,
      items: [
        { name: 'Iced Latte', price: '11,50' },
        { name: 'Iced Chai Latte', price: '13,50' },
        { name: 'Iced Matcha Latte', price: '13,50' },
        { name: 'Frappuccino', price: '13,50' },
        { name: 'Oreo, Caramel or Chocolate', price: '+2,50', note: 'additional charge' }
      ]
    }
  ];

  // Drinks & Shop sections and items
  const drinksShopSections = [
    {
      id: 'water',
      title: 'WATER',
      order: 0,
      items: [
        { name: 'Hot Water', price: '4,-' },
        { name: 'Water Still', price: '6,-' },
        { name: 'Water Sparkling', price: '7,-' }
      ]
    },
    {
      id: 'add-ons',
      title: 'ADD ONS',
      order: 1,
      items: [
        { name: 'Coco-, Almond- or Oatmilk', price: '2,50' },
        { name: 'Extra Shot Coffee or Syrup', price: '2,50' },
        { name: 'Whipped Cream', price: '2,50' }
      ]
    },
    {
      id: 'iced-specials',
      title: 'ICED SPECIALS',
      order: 2,
      items: [
        { name: 'Strawberry Matcha Latte', price: '15,50' },
        { name: 'Stroopwafel Latte', price: '15,50' },
        { name: 'Pumpkin Spice Latte', price: '16,50' }
      ]
    },
    {
      id: 'slush',
      title: 'SLUSH',
      order: 3,
      items: [
        { name: 'Pink Lemonade', price: '8,-' },
        { name: 'Slush Special', price: '8,50' }
      ]
    },
    {
      id: 'shop',
      title: 'SHOP',
      order: 4,
      items: [
        { 
          name: 'Discover old dutch candy, Delft Blue tiles & cans, bags of stroopwafels and more in our shop!', 
          price: '', 
          isDescription: true 
        }
      ]
    }
  ];

  // Create sections and items for Stroopwafels
  for (const sectionData of stroopwafelsSections) {
    const section = await prisma.menuSection.create({
      data: {
        id: sectionData.id,
        title: sectionData.title,
        order: sectionData.order,
        categoryId: stroopwafelsCategory.id,
        isActive: true
      }
    });

    for (let i = 0; i < sectionData.items.length; i++) {
      const item = sectionData.items[i];
      await prisma.menuItem.create({
        data: {
          id: `${sectionData.id}-item-${i}`,
          name: item.name,
          price: item.price || null,
          note: item.note || null,
          isPopular: item.isPopular || false,
          isActive: true,
          order: i,
          sectionId: section.id
        }
      });
    }
  }

  // Create sections and items for Coffee & Drinks
  for (const sectionData of coffeeSections) {
    const section = await prisma.menuSection.create({
      data: {
        id: sectionData.id,
        title: sectionData.title,
        order: sectionData.order,
        categoryId: coffeeCategory.id,
        isActive: true
      }
    });

    for (let i = 0; i < sectionData.items.length; i++) {
      const item = sectionData.items[i];
      await prisma.menuItem.create({
        data: {
          id: `${sectionData.id}-item-${i}`,
          name: item.name,
          price: item.price || null,
          note: item.note || null,
          isPopular: item.isPopular || false,
          isActive: true,
          order: i,
          sectionId: section.id
        }
      });
    }
  }

  // Create sections and items for Drinks & Shop
  for (const sectionData of drinksShopSections) {
    const section = await prisma.menuSection.create({
      data: {
        id: sectionData.id,
        title: sectionData.title,
        order: sectionData.order,
        categoryId: drinksShopCategory.id,
        isActive: true
      }
    });

    for (let i = 0; i < sectionData.items.length; i++) {
      const item = sectionData.items[i];
      await prisma.menuItem.create({
        data: {
          id: `${sectionData.id}-item-${i}`,
          name: item.name,
          price: item.price || null,
          note: item.note || null,
          isPopular: item.isPopular || false,
          isActive: true,
          order: i,
          sectionId: section.id
        }
      });
    }
  }

  console.log('Menu data cleaned and reseeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

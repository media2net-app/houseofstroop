const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Checking menu data in database...');

  // Check categories
  const categories = await prisma.menuCategory.findMany({
    include: {
      sections: {
        include: {
          items: true
        }
      }
    }
  });

  console.log(`\nFound ${categories.length} categories:`);
  categories.forEach(category => {
    console.log(`- ${category.title} (${category.sections.length} sections)`);
    category.sections.forEach(section => {
      console.log(`  - ${section.title} (${section.items.length} items)`);
      section.items.forEach(item => {
        console.log(`    - ${item.name} - ${item.price || 'No price'}`);
      });
    });
  });

  // Check if we have the specific items we added
  const stroopwafelItems = await prisma.menuItem.findMany({
    where: {
      name: {
        contains: 'Stroopwafel'
      }
    }
  });

  console.log(`\nFound ${stroopwafelItems.length} stroopwafel items:`);
  stroopwafelItems.forEach(item => {
    console.log(`- ${item.name} - ${item.price}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

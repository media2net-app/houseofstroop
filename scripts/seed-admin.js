const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'emma@houseofstroop.com' },
    update: {},
    create: {
      email: 'emma@houseofstroop.com',
      name: 'Emma',
      password: hashedPassword,
      role: 'admin'
    }
  });

  console.log('Admin user created:', admin);

  // Create sample menu data
  const stroopwafelsCategory = await prisma.menuCategory.upsert({
    where: { id: 'stroopwafels' },
    update: {},
    create: {
      id: 'stroopwafels',
      title: 'Stroopwafels',
      order: 0
    }
  });

  const freshSection = await prisma.menuSection.upsert({
    where: { id: 'fresh-stroopwafels' },
    update: {},
    create: {
      id: 'fresh-stroopwafels',
      title: 'FRESH STROOPWAFELS XL',
      order: 0,
      categoryId: stroopwafelsCategory.id
    }
  });

  // Create sample menu items
  await prisma.menuItem.upsert({
    where: { id: 'fresh-classic' },
    update: {},
    create: {
      id: 'fresh-classic',
      name: 'Fresh Classic Stroopwafel XL',
      price: '17,95',
      isPopular: true,
      order: 0,
      sectionId: freshSection.id
    }
  });

  await prisma.menuItem.upsert({
    where: { id: 'fresh-glutenfree' },
    update: {},
    create: {
      id: 'fresh-glutenfree',
      name: 'Fresh Classic Stroopwafel XL Glutenfree',
      price: '21,95',
      note: 'upon availability',
      order: 1,
      sectionId: freshSection.id
    }
  });

  console.log('Sample data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Seed script to populate sample data for testing and demonstration
// Run this script with: node seedSampleData.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const sampleProducts = [
    // Strength Equipment
    {
        name: 'Adjustable Dumbbell Set',
        description: 'Professional grade adjustable dumbbells with quick-lock mechanism. Weight range: 5-50 lbs per dumbbell.',
        price: 299.99,
        discount: 15,
        category: 'Strength',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500',
        featured: true
    },
    {
        name: 'Olympic Barbell',
        description: '7ft Olympic barbell with knurled grip. Perfect for powerlifting and strength training. Max load: 1000 lbs.',
        price: 189.99,
        discount: 10,
        category: 'Strength',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
        featured: false
    },
    {
        name: 'Kettlebell Set',
        description: 'Cast iron kettlebell set including 15lb, 25lb, and 35lb. Textured handle for secure grip.',
        price: 149.99,
        discount: 0,
        category: 'Strength',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
        featured: false
    },
    {
        name: 'Weight Bench Pro',
        description: 'Adjustable weight bench with 7 positions. Max capacity: 600 lbs. Includes leg developer.',
        price: 249.99,
        discount: 20,
        category: 'Strength',
        stock: 8,
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500',
        featured: true
    },
    {
        name: 'Power Rack',
        description: 'Heavy-duty power rack with pull-up bar. Height adjustable safety bars. Built for serious lifters.',
        price: 599.99,
        discount: 5,
        category: 'Strength',
        stock: 6,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
        featured: false
    },

    // Cardio Equipment
    {
        name: 'Treadmill Pro 3000',
        description: 'Commercial grade treadmill with 3.5 HP motor. Speed range: 0-12 mph. 15 incline levels.',
        price: 1299.99,
        discount: 10,
        category: 'Cardio',
        stock: 4,
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500',
        featured: true
    },
    {
        name: 'Stationary Bike Elite',
        description: 'Indoor cycling bike with magnetic resistance. LCD monitor displays time, distance, calories, and heart rate.',
        price: 449.99,
        discount: 15,
        category: 'Cardio',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500',
        featured: false
    },
    {
        name: 'Rowing Machine',
        description: 'Air resistance rowing machine with performance monitor. Full body workout for all fitness levels.',
        price: 699.99,
        discount: 8,
        category: 'Cardio',
        stock: 7,
        image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=500',
        featured: false
    },
    {
        name: 'Elliptical Trainer',
        description: 'Zero-impact elliptical with 20 resistance levels. Dual-action arms for upper body workout.',
        price: 799.99,
        discount: 12,
        category: 'Cardio',
        stock: 5,
        image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500',
        featured: false
    },

    // Functional Equipment
    {
        name: 'Battle Ropes',
        description: '50ft heavy duty battle ropes for HIIT training. 1.5 inch diameter, includes anchor strap.',
        price: 89.99,
        discount: 0,
        category: 'Functional',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
        featured: false
    },
    {
        name: 'Medicine Ball Set',
        description: 'Set of 5 medicine balls (6, 8, 10, 12, 15 lbs). Non-slip textured surface.',
        price: 179.99,
        discount: 10,
        category: 'Functional',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
        featured: false
    },
    {
        name: 'Suspension Trainer',
        description: 'Complete bodyweight training system. Includes door anchor and workout guide.',
        price: 129.99,
        discount: 20,
        category: 'Functional',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
        featured: true
    },
    {
        name: 'Plyometric Box Set',
        description: '3-in-1 foam plyo box (20", 24", 30"). Non-slip surface, perfect for box jumps.',
        price: 159.99,
        discount: 0,
        category: 'Functional',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500',
        featured: false
    },

    // Accessories
    {
        name: 'Yoga Mat Premium',
        description: 'Extra thick (6mm) non-slip yoga mat with carrying strap. Eco-friendly TPE material.',
        price: 39.99,
        discount: 5,
        category: 'Accessories',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452ce45?w=500',
        featured: false
    },
    {
        name: 'Resistance Bands Set',
        description: 'Set of 5 resistance bands with handles, door anchor, and ankle straps. Multiple resistance levels.',
        price: 29.99,
        discount: 0,
        category: 'Accessories',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
        featured: false
    },
    {
        name: 'Foam Roller',
        description: 'High-density foam roller for muscle recovery and self-myofascial release. 18 inches.',
        price: 24.99,
        discount: 15,
        category: 'Accessories',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500',
        featured: false
    },
    {
        name: 'Gym Bag Deluxe',
        description: 'Large capacity gym bag with separate shoe compartment and water bottle holder.',
        price: 49.99,
        discount: 10,
        category: 'Accessories',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        featured: false
    },
    {
        name: 'Workout Gloves',
        description: 'Premium workout gloves with wrist support. Breathable material, excellent grip.',
        price: 19.99,
        discount: 0,
        category: 'Accessories',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500',
        featured: false
    },
    {
        name: 'Jump Rope Speed',
        description: 'Professional speed jump rope with ball bearings. Adjustable length, lightweight aluminum handles.',
        price: 14.99,
        discount: 20,
        category: 'Accessories',
        stock: 55,
        image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
        featured: false
    },
    {
        name: 'Water Bottle Insulated',
        description: '32oz stainless steel water bottle. Keeps drinks cold for 24 hours. BPA-free.',
        price: 27.99,
        discount: 0,
        category: 'Accessories',
        stock: 70,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
        featured: false
    }
];

const sampleUsers = [
    // Admin users
    {
        email: 'admin@fitsetup.com',
        password: 'Admin@123',
        role: 'admin',
        first_name: 'Admin',
        last_name: 'User',
        ageGroup: 'Not specified',
        experienceLevel: 'Expert',
        isActive: true
    },
    {
        email: 'manager@fitsetup.com',
        password: 'Manager@123',
        role: 'admin',
        first_name: 'Sarah',
        last_name: 'Johnson',
        ageGroup: '35-44',
        experienceLevel: 'Expert',
        isActive: true
    },

    // Customer users with various demographics
    {
        email: 'john.doe@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '555-0101',
        ageGroup: '25-34',
        experienceLevel: 'Intermediate',
        isActive: true,
        shipping_address: {
            street: '123 Fitness St',
            city: 'Los Angeles',
            zip_code: '90001'
        }
    },
    {
        email: 'emily.smith@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Emily',
        last_name: 'Smith',
        phone_number: '555-0102',
        ageGroup: '18-24',
        experienceLevel: 'Beginner',
        isActive: true,
        shipping_address: {
            street: '456 Gym Ave',
            city: 'New York',
            zip_code: '10001'
        }
    },
    {
        email: 'michael.brown@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Michael',
        last_name: 'Brown',
        phone_number: '555-0103',
        ageGroup: '35-44',
        experienceLevel: 'Expert',
        isActive: true,
        shipping_address: {
            street: '789 Workout Blvd',
            city: 'Chicago',
            zip_code: '60601'
        }
    },
    {
        email: 'jessica.davis@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Jessica',
        last_name: 'Davis',
        phone_number: '555-0104',
        ageGroup: '25-34',
        experienceLevel: 'Intermediate',
        isActive: true,
        shipping_address: {
            street: '321 Health Way',
            city: 'Houston',
            zip_code: '77001'
        }
    },
    {
        email: 'david.wilson@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'David',
        last_name: 'Wilson',
        phone_number: '555-0105',
        ageGroup: '45-54',
        experienceLevel: 'Beginner',
        isActive: false,
        shipping_address: {
            street: '654 Power Rd',
            city: 'Phoenix',
            zip_code: '85001'
        }
    },
    {
        email: 'olivia.taylor@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Olivia',
        last_name: 'Taylor',
        phone_number: '555-0106',
        ageGroup: '18-24',
        experienceLevel: 'Beginner',
        isActive: true,
        shipping_address: {
            street: '987 Strong St',
            city: 'Philadelphia',
            zip_code: '19101'
        }
    },
    {
        email: 'james.anderson@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'James',
        last_name: 'Anderson',
        phone_number: '555-0107',
        ageGroup: '25-34',
        experienceLevel: 'Expert',
        isActive: true,
        shipping_address: {
            street: '147 Flex Ave',
            city: 'San Antonio',
            zip_code: '78201'
        }
    },
    {
        email: 'sophia.martinez@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Sophia',
        last_name: 'Martinez',
        phone_number: '555-0108',
        ageGroup: '35-44',
        experienceLevel: 'Intermediate',
        isActive: true,
        shipping_address: {
            street: '258 Cardio Ct',
            city: 'San Diego',
            zip_code: '92101'
        }
    },
    {
        email: 'robert.garcia@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Robert',
        last_name: 'Garcia',
        phone_number: '555-0109',
        ageGroup: '55+',
        experienceLevel: 'Intermediate',
        isActive: true,
        shipping_address: {
            street: '369 Endurance Dr',
            city: 'Dallas',
            zip_code: '75201'
        }
    },
    {
        email: 'emma.rodriguez@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Emma',
        last_name: 'Rodriguez',
        phone_number: '555-0110',
        ageGroup: '25-34',
        experienceLevel: 'Beginner',
        isActive: true,
        shipping_address: {
            street: '741 Active Ln',
            city: 'San Jose',
            zip_code: '95101'
        }
    },
    {
        email: 'william.hernandez@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'William',
        last_name: 'Hernandez',
        phone_number: '555-0111',
        ageGroup: '45-54',
        experienceLevel: 'Expert',
        isActive: false,
        shipping_address: {
            street: '852 Motion Way',
            city: 'Austin',
            zip_code: '78701'
        }
    },
    {
        email: 'ava.lopez@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Ava',
        last_name: 'Lopez',
        phone_number: '555-0112',
        ageGroup: '18-24',
        experienceLevel: 'Intermediate',
        isActive: true,
        shipping_address: {
            street: '963 Energy Blvd',
            city: 'Jacksonville',
            zip_code: '32099'
        }
    },
    {
        email: 'alexander.gonzalez@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Alexander',
        last_name: 'Gonzalez',
        phone_number: '555-0113',
        ageGroup: '35-44',
        experienceLevel: 'Beginner',
        isActive: true,
        shipping_address: {
            street: '159 Vitality Rd',
            city: 'Fort Worth',
            zip_code: '76101'
        }
    },
    {
        email: 'mia.wilson@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Mia',
        last_name: 'Wilson',
        phone_number: '555-0114',
        ageGroup: '55+',
        experienceLevel: 'Beginner',
        isActive: true,
        shipping_address: {
            street: '357 Balance St',
            city: 'Columbus',
            zip_code: '43004'
        }
    },
    {
        email: 'daniel.lee@email.com',
        password: 'Password@123',
        role: 'customer',
        first_name: 'Daniel',
        last_name: 'Lee',
        phone_number: '555-0115',
        ageGroup: '25-34',
        experienceLevel: 'Expert',
        isActive: false,
        shipping_address: {
            street: '468 Strength Ave',
            city: 'Charlotte',
            zip_code: '28201'
        }
    }
];

const seedDatabase = async () => {
    try {
        console.log('Connecting to database...');
        await connectDB();

        // Clear existing data
        console.log('\nClearing existing data...');
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('Existing data cleared.');

        // Insert products (using create instead of insertMany to trigger pre-save hook for finalPrice)
        console.log('\nInserting sample products...');
        const products = [];
        for (const productData of sampleProducts) {
            const product = await Product.create(productData);
            products.push(product);
        }
        console.log(`✓ ${products.length} products inserted successfully`);

        // Insert users (using create instead of insertMany to trigger password hashing)
        console.log('\nInserting sample users...');
        const users = [];
        for (const userData of sampleUsers) {
            const user = await User.create(userData);
            users.push(user);
        }
        console.log(`✓ ${users.length} users inserted successfully`);

        // Display summary
        console.log('\n========================================');
        console.log('DATABASE SEEDED SUCCESSFULLY!');
        console.log('========================================');
        console.log('\n📊 Summary:');
        console.log(`   Products: ${products.length}`);
        console.log(`   Users: ${users.length}`);
        console.log(`   Admins: ${users.filter(u => u.role === 'admin').length}`);
        console.log(`   Customers: ${users.filter(u => u.role === 'customer').length}`);

        console.log('\n🔐 Admin Login Credentials:');
        console.log('   Email: admin@fitsetup.com');
        console.log('   Password: Admin@123');

        console.log('\n📦 Products by Category:');
        console.log(`   Strength: ${products.filter(p => p.category === 'Strength').length}`);
        console.log(`   Cardio: ${products.filter(p => p.category === 'Cardio').length}`);
        console.log(`   Functional: ${products.filter(p => p.category === 'Functional').length}`);
        console.log(`   Accessories: ${products.filter(p => p.category === 'Accessories').length}`);

        console.log('\n👥 User Demographics:');
        const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55+'];
        ageGroups.forEach(age => {
            const count = users.filter(u => u.ageGroup === age).length;
            if (count > 0) console.log(`   ${age}: ${count}`);
        });

        console.log('\n💪 Experience Levels:');
        const levels = ['Beginner', 'Intermediate', 'Expert'];
        levels.forEach(level => {
            const count = users.filter(u => u.experienceLevel === level).length;
            if (count > 0) console.log(`   ${level}: ${count}`);
        });

        console.log('\n✅ You can now log in to the admin dashboard to view the data!');
        console.log('========================================\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();

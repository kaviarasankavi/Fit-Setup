// Script to populate demo users with demographic data
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedDemoUsers = async () => {
    try {
        await connectDB();

        // Sample demo users with varied demographics
        const demoUsers = [
            {
                email: 'john.beginner@example.com',
                password: 'Password123!',
                role: 'customer',
                first_name: 'John',
                last_name: 'Smith',
                ageGroup: '18-24',
                experienceLevel: 'Beginner',
                isActive: true
            },
            {
                email: 'sarah.intermediate@example.com',
                password: 'Password123!',
                role: 'customer',
                first_name: 'Sarah',
                last_name: 'Johnson',
                ageGroup: '25-34',
                experienceLevel: 'Intermediate',
                isActive: true
            },
            {
                email: 'mike.expert@example.com',
                password: 'Password123!',
                role: 'customer',
                first_name: 'Mike',
                last_name: 'Williams',
                ageGroup: '35-44',
                experienceLevel: 'Expert',
                isActive: true
            },
            {
                email: 'emily.beginner@example.com',
                password: 'Password123!',
                role: 'customer',
                first_name: 'Emily',
                last_name: 'Davis',
                ageGroup: '25-34',
                experienceLevel: 'Beginner',
                isActive: false
            },
            {
                email: 'robert.intermediate@example.com',
                password: 'Password123!',
                role: 'customer',
                first_name: 'Robert',
                last_name: 'Brown',
                ageGroup: '45-54',
                experienceLevel: 'Intermediate',
                isActive: true
            },
            {
                email: 'lisa.expert@example.com',
                password: 'Password123!',
                role: 'customer',
                first_name: 'Lisa',
                last_name: 'Miller',
                ageGroup: '35-44',
                experienceLevel: 'Expert',
                isActive: true
            },
            {
                email: 'david.beginner@example.com',
                password: 'Password123!',
                role: 'customer',
                first_name: 'David',
                last_name: 'Wilson',
                ageGroup: '55+',
                experienceLevel: 'Beginner',
                isActive: true
            },
            {
                email: 'jennifer.intermediate@example.com',
                password: 'Password123!',
                role: 'customer',
                first_name: 'Jennifer',
                last_name: 'Moore',
                ageGroup: '18-24',
                experienceLevel: 'Intermediate',
                isActive: true
            }
        ];

        let createdCount = 0;
        let skippedCount = 0;

        for (const userData of demoUsers) {
            const existingUser = await User.findOne({ email: userData.email });

            if (existingUser) {
                console.log(`⏭️  Skipped: ${userData.email} already exists`);
                skippedCount++;
            } else {
                await User.create(userData);
                console.log(`✅ Created: ${userData.email}`);
                createdCount++;
            }
        }

        console.log('\n====================================');
        console.log(`✅ Created ${createdCount} new demo users`);
        console.log(`⏭️  Skipped ${skippedCount} existing users`);
        console.log('====================================');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding demo data:', error.message);
        process.exit(1);
    }
};

seedDemoUsers();

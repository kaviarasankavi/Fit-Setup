// Script to update admin user role from customer to admin
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const updateAdminRole = async () => {
    try {
        // Connect to database
        await connectDB();

        const adminEmail = 'admin@fitsetup.com';

        // Find and update the user
        const user = await User.findOneAndUpdate(
            { email: adminEmail },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log('✅ Admin user updated successfully!');
            console.log('===================================');
            console.log('Email:', user.email);
            console.log('Role:', user.role);
            console.log('===================================');
        } else {
            console.log('❌ User not found!');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error updating admin role:', error.message);
        process.exit(1);
    }
};

updateAdminRole();

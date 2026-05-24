const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const User = require('../models/User');

// Load env variables
dotenv.config({ path: './.env' });

const seedData = async () => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected for seeding...');

        // Clear existing categories and subcategories to avoid duplicates
        await Category.deleteMany();
        await SubCategory.deleteMany();
        console.log('Old categories and subcategories cleared.');

        // 1. Create Main Categories
        const science = await Category.create({ name: 'Science' });
        const development = await Category.create({ name: 'Development' });
        console.log('Main categories created successfully!');

        // 2. Create Sub-Categories linked to their parent categories
        await SubCategory.create([
            { name: 'Space', category_id: science._id },
            { name: 'Biology', category_id: science._id },
            { name: 'Node.js', category_id: development._id },
            { name: 'Angular', category_id: development._id }
        ]);
        console.log('Sub-categories linked and created successfully!');

        // 3. Create a default Admin user if not exists (Bonus feature)
        const adminPhone = '0500000000';
        const adminExists = await User.findOne({ phone: adminPhone });
        if (!adminExists) {
            await User.create({
                name: 'System Admin',
                phone: adminPhone,
                role: 'admin'
            });
            console.log('Default Admin user created! (Phone: 0500000000)');
        }

        console.log('Database Seeding Completed Successfully! 🌱');
        process.exit();
    } catch (error) {
        console.error('Error with database seeding:', error.message);
        process.exit(1);
    }
};

seedData();
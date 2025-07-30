const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to get INR to USD conversion rate
const fetchConversionRate = async () => {
  try {
    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`
    );
    const inrRate = data.conversion_rates.INR;
    return inrRate;
  } catch (error) {
    console.error("Error fetching conversion rate:", error.message);
    return 83; // fallback INR rate
  }
};

// Seed function
const seedData = async () => {
  try {
    const inrRate = await fetchConversionRate();
    console.log("Using INR rate:", inrRate);

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const userId = createdUser._id;

    // Convert prices from USD to INR
    const sampleProducts = products.map((product) => ({
      ...product,
      user: userId,
      price: Math.round(product.price * inrRate),
      discountPrice: Math.round(product.discountPrice * inrRate),
    }));

    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully with INR pricing!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();

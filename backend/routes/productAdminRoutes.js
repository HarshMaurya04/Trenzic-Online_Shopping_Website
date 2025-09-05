const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//  @route   GET /api/admin/products
//  @desc    Get all products (Admin only)
//  @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("GET /api/admin/products error:", error);
    res.status(500).json({ message: "Server Error!" });
  }
});


//  @route   POST /api/admin/products
//  @desc    Create a new product (Admin only)
//  @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
    } = req.body;

    // Basic required validations (schema will enforce as well)
    if (!name || !description || !price || !countInStock || !sku || !category || !collections) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Normalize types
    const doc = {
      name: String(name).trim(),
      description: String(description),
      price: Number(price),
      discountPrice: discountPrice !== undefined && discountPrice !== "" ? Number(discountPrice) : undefined,
      countInStock: Number(countInStock),
      sku: String(sku).trim(),
      category: String(category).trim(),
      brand: brand ? String(brand).trim() : undefined,
      sizes: Array.isArray(sizes)
        ? sizes.map((s) => String(s).trim()).filter(Boolean)
        : String(sizes || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      colors: Array.isArray(colors)
        ? colors.map((c) => String(c).trim()).filter(Boolean)
        : String(colors || "")
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
      collections: String(collections).trim(),
      material: material ? String(material).trim() : undefined,
      // Ensure Gender matches enum ["Men", "Women", "Unisex"]
      gender: gender ? String(gender).trim() : undefined,
      images: Array.isArray(images)
        ? images
            .map((img) => ({
              url: String(img.url),
              altText: img.altText ? String(img.altText) : "",
            }))
            .filter((img) => img.url)
        : [],
      isFeatured: Boolean(isFeatured),
      isPublished: Boolean(isPublished),
      tags: Array.isArray(tags)
        ? tags.map((t) => String(t).trim()).filter(Boolean)
        : String(tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
      metaTitle: metaTitle ? String(metaTitle) : undefined,
      metaDescription: metaDescription ? String(metaDescription) : undefined,
      metaKeywords: metaKeywords ? String(metaKeywords) : undefined,
      dimensions: dimensions
        ? {
            length: dimensions.length !== undefined && dimensions.length !== "" ? Number(dimensions.length) : undefined,
            width: dimensions.width !== undefined && dimensions.width !== "" ? Number(dimensions.width) : undefined,
            height: dimensions.height !== undefined && dimensions.height !== "" ? Number(dimensions.height) : undefined,
          }
        : undefined,
      weight: weight !== undefined && weight !== "" ? Number(weight) : undefined,
      user: req.user._id, // required by schema
    };

    // Enforce gender enum formatting if provided
    if (doc.gender) {
      const normalized = doc.gender.toLowerCase();
      if (normalized === "men") doc.gender = "Men";
      else if (normalized === "women") doc.gender = "Women";
      else if (normalized === "unisex") doc.gender = "Unisex";
    }

    const created = await Product.create(doc);
    return res.status(201).json(created);
  } catch (error) {
    console.error("POST /api/admin/products error:", error);
    // Handle duplicate SKU, etc.
    if (error.code === 11000 && error.keyPattern && error.keyPattern.sku) {
      return res.status(400).json({ message: "SKU must be unique" });
    }
    return res.status(500).json({ message: "Server Error!" });
  }
});

module.exports = router;

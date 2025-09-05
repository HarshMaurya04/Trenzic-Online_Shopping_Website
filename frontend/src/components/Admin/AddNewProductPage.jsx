import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";

const AddNewProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { creating, createError } = useSelector((s) => s.adminProducts);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "", // "Men" | "Women" | "Unisex"
    images: [], // [{url, altText}]
    isFeatured: false,
    isPublished: false,
    tags: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    dimensions: { length: "", width: "", height: "" },
    weight: "",
  });

  // Raw input states for smooth typing
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setProductData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (name.startsWith("dimensions.")) {
      const field = name.split(".")[1];
      setProductData((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [field]: value },
      }));
      return;
    }

    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle raw input changes
  const handleSizesChange = (e) => setSizeInput(e.target.value);
  const handleColorsChange = (e) => setColorInput(e.target.value);
  const handleTagsChange = (e) => setTagInput(e.target.value);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleAltTextChange = (i, val) => {
    setProductData((prev) => {
      const next = [...prev.images];
      next[i] = { ...next[i], altText: val };
      return { ...prev, images: next };
    });
  };

  const removeImage = (i) => {
    setProductData((prev) => {
      const next = [...prev.images];
      next.splice(i, 1);
      return { ...prev, images: next };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...productData,
      price: productData.price === "" ? "" : Number(productData.price),
      discountPrice:
        productData.discountPrice === ""
          ? ""
          : Number(productData.discountPrice),
      countInStock: Number(productData.countInStock || 0),
      dimensions: {
        length:
          productData.dimensions.length === ""
            ? ""
            : Number(productData.dimensions.length),
        width:
          productData.dimensions.width === ""
            ? ""
            : Number(productData.dimensions.width),
        height:
          productData.dimensions.height === ""
            ? ""
            : Number(productData.dimensions.height),
      },
      weight: productData.weight === "" ? "" : Number(productData.weight),
      // Convert raw inputs to arrays
      sizes: sizeInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      colors: colorInput
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      tags: tagInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const resultAction = await dispatch(createProduct(payload));
    if (createProduct.fulfilled.match(resultAction)) {
      navigate("/admin/products");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-2xl sm:rounded-3xl bg-slate-50">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>

      {createError && (
        <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700">
          {createError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Fields */}
        <div>
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-slate-300 rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-slate-300 rounded-xl"
            required
          ></textarea>
        </div>

        {/* Pricing & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              min={0}
              className="w-full p-2 border border-slate-300 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">
              Discount Price (₹)
            </label>
            <input
              type="number"
              name="discountPrice"
              value={productData.discountPrice}
              onChange={handleChange}
              min={0}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Stock Count</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              min={0}
              className="w-full p-2 border border-slate-300 rounded-xl"
              required
            />
          </div>
        </div>

        {/* SKU & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Category, Brand, Collections, Material */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Collections</label>
            <input
              type="text"
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Material</label>
            <input
              type="text"
              name="material"
              value={productData.material}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
        </div>

        {/* Sizes, Colors, Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              value={sizeInput}
              onChange={handleSizesChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              value={colorInput}
              onChange={handleColorsChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={handleTagsChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
        </div>

        {/* Dimensions & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block font-semibold mb-2">Length</label>
            <input
              type="number"
              name="dimensions.length"
              value={productData.dimensions.length}
              onChange={handleChange}
              min={0}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Width</label>
            <input
              type="number"
              name="dimensions.width"
              value={productData.dimensions.width}
              onChange={handleChange}
              min={0}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Height</label>
            <input
              type="number"
              name="dimensions.height"
              value={productData.dimensions.height}
              onChange={handleChange}
              min={0}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Weight</label>
            <input
              type="number"
              name="weight"
              value={productData.weight}
              onChange={handleChange}
              min={0}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
        </div>

        {/* Flags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isFeatured"
              checked={productData.isFeatured}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="font-semibold">Featured</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isPublished"
              checked={productData.isPublished}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="font-semibold">Published</span>
          </label>
        </div>

        {/* SEO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={productData.metaTitle}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Meta Description</label>
            <input
              type="text"
              name="metaDescription"
              value={productData.metaDescription}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Meta Keywords</label>
            <input
              type="text"
              name="metaKeywords"
              value={productData.metaKeywords}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading image...</p>
          )}

          {productData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {productData.images.map((img, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white border border-slate-200"
                >
                  <img
                    src={img.url}
                    alt={img.altText || "Product"}
                    className="w-full h-28 object-cover rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Alt text"
                    value={img.altText}
                    onChange={(e) => handleAltTextChange(i, e.target.value)}
                    className="mt-2 w-full p-2 border border-slate-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="mt-2 w-full bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={creating}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-60"
        >
          {creating ? "Creating..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddNewProductPage;

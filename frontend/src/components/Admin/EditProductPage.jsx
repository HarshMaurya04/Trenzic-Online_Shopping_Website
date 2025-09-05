import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import { updateProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  // Raw input states for smooth typing
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
      // Fill raw inputs from array values
      setSizeInput(selectedProduct.sizes?.join(", ") || "");
      setColorInput(selectedProduct.colors?.join(", ") || "");
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSizesChange = (e) => {
    setSizeInput(e.target.value); // store raw text only
  };

  const handleColorsChange = (e) => {
    setColorInput(e.target.value); // store raw text only
  };

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
      e.target.value = ""; // reset file input
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert raw strings to arrays before dispatch
    const updatedProduct = {
      ...productData,
      sizes: sizeInput.split(",").map((s) => s.trim()).filter(Boolean),
      colors: colorInput.split(",").map((c) => c.trim()).filter(Boolean),
    };
    dispatch(updateProduct({ id, productData: updatedProduct }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-2xl sm:rounded-3xl bg-slate-50">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
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

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-slate-300 rounded-xl"
            required
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={productData.price}
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
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
        </div>

        {/* Sizes & Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Sizes</label>
            <input
              type="text"
              value={sizeInput}
              onChange={handleSizesChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
              placeholder="e.g. S, M, L, XL"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Colors</label>
            <input
              type="text"
              value={colorInput}
              onChange={handleColorsChange}
              className="w-full p-2 border border-slate-300 rounded-xl"
              placeholder="e.g. Red, Blue, Black"
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
          className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;

import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Package, Plus, Edit2, Trash2, X, UploadCloud, Image as ImageIcon, Search, AlertCircle } from 'lucide-react';

function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  // Form / Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    imageUrls: []
  });
  
  // Selected file objects for multipart upload
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        axiosClient.get('/products'),
        axiosClient.get('/categories')
      ]);

      const catMap = {};
      catRes.data.forEach(c => {
        catMap[c.id] = c.name;
      });
      setCategories(catRes.data);

      const prodList = prodRes.data.map(p => ({
        ...p,
        categoryName: catMap[p.categoryId] || 'Uncategorized'
      }));
      setProducts(prodList);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      categoryId: categories[0]?.id || '',
      imageUrls: []
    });
    setSelectedFiles([]);
    setPreviewUrls([]);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock: product.stock || '',
      categoryId: product.categoryId || categories[0]?.id || '',
      imageUrls: product.imageUrls || []
    });
    setSelectedFiles([]);
    setPreviewUrls(product.imageUrls || []);
    setError('');
    setModalOpen(true);
  };

  // Image Selection Handler (for Express multipart memoryStorage upload)
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (indexToRemove) => {
    setPreviewUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setError('Product name is required.');
    if (!formData.price || isNaN(formData.price)) return setError('Valid price is required.');

    setSubmitting(true);
    setError('');

    try {
      // Build FormData payload for Express API multipart route
      const uploadData = new FormData();
      uploadData.append('name', formData.name.trim());
      uploadData.append('description', formData.description.trim());
      uploadData.append('price', parseFloat(formData.price));
      uploadData.append('stock', parseInt(formData.stock, 10) || 0);
      uploadData.append('categoryId', formData.categoryId || categories[0]?.id || '');
      uploadData.append('imageUrls', JSON.stringify(formData.imageUrls));

      // Append selected image files
      selectedFiles.forEach(file => {
        uploadData.append('images', file);
      });

      if (editingProduct) {
        // PATCH /api/products/:id
        await axiosClient.patch(`/products/${editingProduct.id}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // POST /api/products
        await axiosClient.post('/products', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("Error saving product:", err);
      setError(err.response?.data?.error || err.message || 'Failed to save product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      await axiosClient.delete(`/products/${product.id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert('Failed to delete product: ' + (err.response?.data?.error || err.message));
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'ALL' || p.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-sage-950 font-bold flex items-center gap-3">
            <Package className="w-7 h-7 text-gold-600" />
            Product Management
          </h1>
          <p className="text-sage-600 text-sm mt-1">
            Manage product listings, pricing, stock levels, and multipart Storage images (Express API)
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary py-3 px-6 shadow-md inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 rounded-2xl border border-white/70 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title or description..."
            className="input-premium pl-12"
          />
        </div>

        <div>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="input-premium"
          >
            <option value="ALL">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List Table */}
      {loading ? (
        <div className="text-center py-12 text-sage-600 font-medium">Loading product inventory...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl border border-white/70">
          <Package className="w-12 h-12 text-sage-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold text-sage-900">No Products Found</h3>
          <p className="text-sage-600 text-sm mt-1">
            {search || selectedCategoryFilter !== 'ALL'
              ? 'No products match your filter criteria.'
              : 'Add your first product to display it in the customer storefront.'}
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-3xl border border-white/70 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-sage-800">
              <thead className="bg-sage-100/60 border-b border-sage-200/60 text-xs font-semibold uppercase tracking-wider text-sage-700">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-sage-950 flex items-center gap-3">
                      {p.imageUrls && p.imageUrls.length > 0 ? (
                        <img
                          src={p.imageUrls[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-sage-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center text-sage-400">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold">{p.name}</div>
                        <div className="text-xs text-sage-500 max-w-xs truncate">{p.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sage-100 text-sage-800">
                        {p.categoryName}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-sage-900">
                      ${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.stock > 10
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.stock > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded-xl text-sage-700 hover:bg-sage-100 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-sage-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card w-full max-w-2xl p-6 rounded-3xl border border-white/80 shadow-2xl bg-white/95 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-sage-100">
              <h2 className="font-heading text-2xl font-bold text-sage-950">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-sage-100 text-sage-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Botanical Hydration Serum"
                    className="input-premium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="input-premium"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product ingredients and benefit highlights..."
                  className="input-premium py-3 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="48.00"
                    className="input-premium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="50"
                    className="input-premium"
                  />
                </div>
              </div>

              {/* Express API Image Upload (Multer Memory Storage -> Firebase Storage) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                  Product Images (Express Multipart &rarr; Storage)
                </label>
                
                <div className="border-2 border-dashed border-sage-200 rounded-2xl p-6 text-center bg-sage-50/50 hover:bg-sage-50 transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-8 h-8 text-sage-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-sage-800">
                    Click or drag image files here to upload via Express API
                  </p>
                  <p className="text-xs text-sage-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                </div>

                {/* Uploaded Images Preview List */}
                {previewUrls.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-sage-300">
                        <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-sage-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary py-2.5 px-5 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary py-2.5 px-6 text-xs disabled:opacity-50"
                >
                  {submitting ? 'Saving Product...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsManager;

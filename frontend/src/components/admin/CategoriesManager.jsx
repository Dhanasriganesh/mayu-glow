import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { FolderTree, Plus, Edit2, Trash2, X, Search, AlertCircle } from 'lucide-react';

function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name || '', description: category.description || '' });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setError('Category name is required.');

    setSubmitting(true);
    setError('');

    try {
      if (editingCategory) {
        // Update category via Express API (PATCH /api/categories/:id)
        await axiosClient.patch(`/categories/${editingCategory.id}`, {
          name: formData.name.trim(),
          description: formData.description.trim()
        });
      } else {
        // Create category via Express API (POST /api/categories)
        await axiosClient.post('/categories', {
          name: formData.name.trim(),
          description: formData.description.trim()
        });
      }

      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      setError(err.response?.data?.error || err.message || 'Failed to save category.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axiosClient.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      alert('Failed to delete category: ' + (err.response?.data?.error || err.message));
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name?.toLowerCase().includes(search.toLowerCase()) ||
    cat.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-sage-950 font-bold flex items-center gap-3">
            <FolderTree className="w-7 h-7 text-gold-600" />
            Category Management
          </h1>
          <p className="text-sage-600 text-sm mt-1">
            Organize products into clear catalog categories (Express API)
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary py-3 px-6 shadow-md inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/70">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories by name or description..."
            className="input-premium pl-12"
          />
        </div>
      </div>

      {/* Table / Grid */}
      {loading ? (
        <div className="text-center py-12 text-sage-600 font-medium">Loading categories...</div>
      ) : filteredCategories.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl border border-white/70">
          <FolderTree className="w-12 h-12 text-sage-400 mx-auto mb-3" />
          <h3 className="font-heading text-xl font-bold text-sage-900">No Categories Found</h3>
          <p className="text-sage-600 text-sm mt-1">
            {search ? 'No categories match your search criteria.' : 'Get started by creating your first product category.'}
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-3xl border border-white/70 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-sage-800">
              <thead className="bg-sage-100/60 border-b border-sage-200/60 text-xs font-semibold uppercase tracking-wider text-sage-700">
                <tr>
                  <th className="px-6 py-4">Category Name</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-sage-950">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-sage-600 max-w-md truncate">
                      {cat.description || <span className="italic text-sage-400">No description</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-2 rounded-xl text-sage-700 hover:bg-sage-100 transition-colors"
                          title="Edit Category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Category"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-sage-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg p-6 rounded-3xl border border-white/80 shadow-2xl bg-white/95">
            <div className="flex items-center justify-between pb-4 border-b border-sage-100">
              <h2 className="font-heading text-2xl font-bold text-sage-950">
                {editingCategory ? 'Edit Category' : 'Create Category'}
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
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cleansers, Serums, Moisturizers"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of products in this category..."
                  className="input-premium py-3 resize-none"
                />
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
                  {submitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesManager;

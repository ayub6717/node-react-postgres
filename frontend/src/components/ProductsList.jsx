import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/apiService';

const CATEGORIES = ['Electronics', 'Audio', 'Accessories', 'Wearables', 'Other'];

const CategoryBadge = ({ category }) => {
  const colors = {
    Electronics: 'bg-blue-50 text-blue-700 border-blue-200',
    Audio: 'bg-purple-50 text-purple-700 border-purple-200',
    Accessories: 'bg-amber-50 text-amber-700 border-amber-200',
    Wearables: 'bg-pink-50 text-pink-700 border-pink-200',
    Other: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colors[category] || colors.Other}`}>
      {category}
    </span>
  );
};

const StockBadge = ({ stock }) => {
  if (stock === 0) return <span className="text-xs font-semibold text-red-500">Out of Stock</span>;
  if (stock <= 10) return <span className="text-xs font-semibold text-amber-500">Low: {stock} left</span>;
  return <span className="text-xs font-semibold text-green-600">{stock} in stock</span>;
};

const ProductModal = ({ product, onClose, onSave }) => {
  const isEdit = Boolean(product?.id);
  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price || '',
    description: product?.description || '',
    category: product?.category || 'Electronics',
    stock: product?.stock ?? 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave({ ...(isEdit ? { id: product.id } : {}), ...form });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Product Name *</label>
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Gaming Laptop"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Price ($) *</label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Stock</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Short product description..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-semibold transition disabled:opacity-50">
              {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductsList = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null); // null | 'add' | {id, ...}
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['products'] }); setModal(null); },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['products'] }); setModal(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['products'] }); setDeleteConfirm(null); },
  });

  const handleSave = async (data) => {
    if (data.id) await updateMutation.mutateAsync(data);
    else await createMutation.mutateAsync(data);
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
        <p className="font-semibold text-sm">Failed to load products</p>
        <p className="text-sm mt-1 text-red-500">{error.message}</p>
        <p className="text-xs mt-2 text-red-400">Make sure the API is running on port 3002.</p>
      </div>
    );
  }

  return (
    <>
      {/* Modal */}
      {modal && (
        <ProductModal
          product={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-base font-bold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(deleteConfirm.id)}
                disabled={deleteMutation.isPending}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2.5 text-sm font-semibold transition disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Products</h2>
            <p className="text-sm text-gray-400 mt-0.5">{products?.length ?? 0} items in database</p>
          </div>
          <button
            onClick={() => setModal('add')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <span>+</span> Add Product
          </button>
        </div>

        {/* Grid */}
        {products?.length === 0 ? (
          <div className="text-center py-14 text-gray-400">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-sm font-medium">No products yet</p>
            <p className="text-xs mt-1">Click "Add Product" to create your first one</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <div
                key={product.id}
                className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">{product.name}</h3>
                  {product.category && <CategoryBadge category={product.category} />}
                </div>

                {/* Price */}
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>

                {/* Description */}
                {product.description && (
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{product.description}</p>
                )}

                {/* Stock */}
                <div className="mb-4">
                  <StockBadge stock={product.stock} />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setModal(product)}
                    className="flex-1 text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg py-1.5 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(product)}
                    className="flex-1 text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 rounded-lg py-1.5 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;

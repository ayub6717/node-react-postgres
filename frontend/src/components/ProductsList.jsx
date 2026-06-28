import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/apiService';

const ProductsList = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-green-500"></div>
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
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Products</h2>
        <span className="text-sm text-gray-400">{products?.length ?? 0} total</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border border-gray-100 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
              {product.category && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
              )}
            </div>
            <p className="text-xl font-bold text-green-600">${product.price.toLocaleString()}</p>
            {product.description && (
              <p className="text-xs text-gray-500 mt-1">{product.description}</p>
            )}
            {product.stock !== undefined && (
              <p className="text-xs text-gray-400 mt-2">Stock: {product.stock}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;

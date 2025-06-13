'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Link from 'next/link';
import { deleteProduct } from '@/lib/firebase/products';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  inStock: boolean;
  stockCount: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const items: Product[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        setProducts(items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await deleteProduct(productId);
      alert('Product deleted successfully!');
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      alert('Error deleting product.');
      console.error(error);
    }
  };

  if (loading) return <p className="p-8 text-center">Loading products...</p>;
  if (!products.length) return <p className="p-8 text-center">No products available yet.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">Ksh {product.price.toLocaleString()}</p>
            <p className={`text-sm mt-1 ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
            </p>

            <div className="mt-4 flex gap-3">
              <Link
                href={`/admin/products/edit/${product.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

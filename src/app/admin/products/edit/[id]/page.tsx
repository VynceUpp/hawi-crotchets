'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, 'products', id as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForm(snap.data());
      } else {
        alert('Product not found.');
        router.push('/admin/products');
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const updatedArray = [...form[field]];
    updatedArray[index] = value;
    setForm((prev: any) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const addArrayItem = (field: string) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: [...(prev[field] || []), ''],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    const updatedArray = [...form[field]];
    updatedArray.splice(index, 1);
    setForm((prev: any) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'products', id as string), form);
      alert('Product updated successfully!');
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    }
  };

  if (loading || !form) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full border p-2 rounded" />

        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded" />


        <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price" className="w-full border p-2 rounded" />

        <input name="originalPrice" value={form.originalPrice} onChange={handleChange} type="number" placeholder="Original Price" className="w-full border p-2 rounded" />

        <input name="rating" value={form.rating} onChange={handleChange} type="number" step="0.1" placeholder="Rating" className="w-full border p-2 rounded" />

        <input name="TotalReviews" value={form.TotalReviews} onChange={handleChange} type="number" placeholder="Total Reviews" className="w-full border p-2 rounded" />

        <input name="stockCount" value={form.stockCount} onChange={handleChange} type="number" placeholder="Stock Count" className="w-full border p-2 rounded" />

        <input name="estimatedDelivery" value={form.estimatedDelivery} onChange={handleChange} placeholder="Estimated Delivery" className="w-full border p-2 rounded" />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" rows={4} />

        {/* Booleans */}
        <label><input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} /> In Stock</label>
        <label><input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} /> New</label>
        <label><input type="checkbox" name="isSale" checked={form.isSale} onChange={handleChange} /> On Sale</label>

        {/* Colors */}
        <div>
          <p>Colors:</p>
          {form.colors?.map((color: string, index: number) => (
            <div key={index} className="flex gap-2 mb-1">
              <label className="sr-only" htmlFor={`color-${index}`}>Color {index + 1}</label>
              <input
                id={`color-${index}`}
                value={color}
                onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                className="border p-2 w-full"
                placeholder={`Enter color ${index + 1}`}
              />
              <button type="button" onClick={() => removeArrayItem('colors', index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('colors')}>+ Add Color</button>
        </div>

        {/* Sizes */}
        <div>
          <p>Sizes:</p>
          {form.sizes?.map((size: string, index: number) => (
            <div key={index} className="flex gap-2 mb-1">
              <label className="sr-only" htmlFor={`size-${index}`}>Size {index + 1}</label>
              <input
                id={`size-${index}`}
                value={size}
                onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                className="border p-2 w-full"
                placeholder={`Enter size ${index + 1}`}
              />
              <button type="button" onClick={() => removeArrayItem('sizes', index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('sizes')}>+ Add Size</button>
        </div>

        {/* Features */}
        <div>
          <p>Features:</p>
          {form.features?.map((feature: string, index: number) => (
            <div key={index} className="flex gap-2 mb-1">
              <label className="sr-only" htmlFor={`feature-${index}`}>Feature {index + 1}</label>
              <input
                id={`feature-${index}`}
                value={feature}
                onChange={(e) => handleArrayChange('features', index, e.target.value)}
                className="border p-2 w-full"
                placeholder={`Enter feature ${index + 1}`}
              />
              <button type="button" onClick={() => removeArrayItem('features', index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('features')}>+ Add Feature</button>
        </div>

        {/* Specifications */}
        <div>
          <p>Specifications:</p>
          {form.specifications && Object.entries(form.specifications).map(([key, value]) => (
            <div key={key} className="flex gap-2 mb-1">
              <label className="w-full">
                <span className="sr-only">Specification Key</span>
                <input 
                  value={key} 
                  disabled 
                  className="border p-2 w-1/3 bg-gray-100" 
                  title={`Specification: ${key}`}
                  placeholder={key}
                />
              </label>
              <label className="w-full">
                <span className="sr-only">Specification Value</span>
                <input 
                  value={value as string} 
                  onChange={(e) => handleSpecificationChange(key, e.target.value)} 
                  className="border p-2 w-2/3"
                  title={`Value for ${key}`}
                  placeholder={`Enter value for ${key}`}
                />
              </label>
            </div>
          ))}
        </div>

        {/* Care Instructions */}
        <div>
          <p>Care Instructions:</p>
          {form.careInstructions?.map((item: string, index: number) => (
            <div key={index} className="flex gap-2 mb-1">
              <label className="w-full">
                <span className="sr-only">Care Instruction {index + 1}</span>
                <input
                  value={item}
                  onChange={(e) => handleArrayChange('careInstructions', index, e.target.value)}
                  className="border p-2 w-full"
                  title={`Care Instruction ${index + 1}`}
                  placeholder={`Enter care instruction ${index + 1}`}
                />
              </label>
              <button type="button" onClick={() => removeArrayItem('careInstructions', index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('careInstructions')}>+ Add Instruction</button>
        </div>

        {/* Images */}
        <div>
          <p>Images:</p>
          {form.images?.map((img: string, index: number) => (
            <div key={index} className="flex gap-2 mb-1">
              <label className="w-full">
                <span className="sr-only">Image URL {index + 1}</span>
                <input
                  value={img}
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                  className="border p-2 w-full"
                  title={`Image URL ${index + 1}`}
                  placeholder={`Enter image URL ${index + 1}`}
                />
              </label>
              <button type="button" onClick={() => removeArrayItem('images', index)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('images')}>+ Add Image</button>
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Update Product
        </button>
      </form>
    </div>
  );
}

'use client';

import { useState, ChangeEvent } from 'react';
import { addProduct } from '@/lib/firebase/products';
import { useRouter } from 'next/navigation';
import { Package, DollarSign, Image, Settings, Info, ArrowLeft } from 'lucide-react';
import { AlertMessage, FormCheckbox, FormInput, FormTextarea, SectionCard } from '@/components/products/FormInput';

const AddProductPage = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        category: '',
        price: '',
        originalPrice: '',
        inStock: true,
        isNew: false,
        isSale: false,
        stockCount: '',
        estimatedDelivery: '',
        description: '',
        colors: '',
        sizes: '',
        features: '',
        specifications: '',
        careInstructions: '',
        images: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const { name, value, type } = target;
        const checked = target instanceof HTMLInputElement ? target.checked : false;

        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            setMessage({ type: 'error', text: 'Product name is required' });
            return false;
        }
        if (!form.price || Number(form.price) <= 0) {
            setMessage({ type: 'error', text: 'Valid price is required' });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setMessage(null);

        try {
            await addProduct({
                name: form.name.trim(),
                category: form.category.trim(),
                price: Number(form.price),
                originalPrice: Number(form.originalPrice) || Number(form.price),
                inStock: form.inStock,
                isNew: form.isNew,
                isSale: form.isSale,
                stockCount: Number(form.stockCount) || 0,
                estimatedDelivery: form.estimatedDelivery.trim(),
                description: form.description.trim(),
                colors: form.colors ? form.colors.split(',').map(c => c.trim()).filter(c => c) : [],
                sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()).filter(s => s) : [],
                features: form.features ? form.features.split(',').map(f => f.trim()).filter(f => f) : [],
                specifications: form.specifications ? Object.fromEntries(
                    form.specifications.split('\n')
                        .map(line => line.split(':'))
                        .filter(([key, value]) => key?.trim() && value?.trim())
                        .map(([key, value]) => [key.trim(), value.trim()])
                ) : {},
                careInstructions: form.careInstructions ?
                    form.careInstructions.split('\n').map(c => c.trim()).filter(c => c) : [],
                images: form.images ? form.images.split(',').map(img => img.trim()).filter(img => img) : [],
                rating: 0,
                TotalReviews: 0,
                reviews: [],
                brand: 'Hawi Crochets'
            });

            setMessage({ type: 'success', text: 'Product added successfully!' });

            // Redirect after a short delay to show success message
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 1500);

        } catch (err) {
            console.error('Error adding product:', err);
            setMessage({ type: 'error', text: 'Failed to add product. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-6">
                    <button
                        onClick={() => router.push('/admin/dashboard')}
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </button>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                    <p className="mt-2 text-gray-600">Create a new product listing for your crochet store</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <SectionCard title="Basic Information" icon={Package}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Product Name"
                                name="name"
                                placeholder="e.g., Handmade Crochet Sweater"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <FormInput
                                label="Category"
                                name="category"
                                placeholder="e.g., Clothing, Accessories, Home Decor"
                                value={form.category}
                                onChange={handleChange}
                            />
                        </div>

                        <FormTextarea
                            label="Description"
                            name="description"
                            placeholder="Describe your product in detail..."
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                        />
                    </SectionCard>

                    {/* Pricing & Stock */}
                    <SectionCard title="Pricing & Inventory" icon={DollarSign}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormInput
                                label="Price"
                                name="price"
                                type="number"
                                placeholder="0.00"
                                value={form.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                            <FormInput
                                label="Original Price"
                                name="originalPrice"
                                type="number"
                                placeholder="0.00 (for sale items)"
                                value={form.originalPrice}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                            />
                            <FormInput
                                label="Stock Count"
                                name="stockCount"
                                type="number"
                                placeholder="0"
                                value={form.stockCount}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>

                        <FormInput
                            label="Estimated Delivery"
                            name="estimatedDelivery"
                            placeholder="e.g., 2-3 weeks, 1 month"
                            value={form.estimatedDelivery}
                            onChange={handleChange}
                        />
                    </SectionCard>

                    {/* Product Details */}
                    <SectionCard title="Product Details" icon={Info}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Available Colors"
                                name="colors"
                                placeholder="Red, Blue, Green (comma-separated)"
                                value={form.colors}
                                onChange={handleChange}
                            />
                            <FormInput
                                label="Available Sizes"
                                name="sizes"
                                placeholder="XS, S, M, L, XL (comma-separated)"
                                value={form.sizes}
                                onChange={handleChange}
                            />
                        </div>

                        <FormInput
                            label="Key Features"
                            name="features"
                            placeholder="Handmade, Machine washable, Eco-friendly (comma-separated)"
                            value={form.features}
                            onChange={handleChange}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormTextarea
                                label="Specifications"
                                name="specifications"
                                placeholder={`Material: 100% Cotton\nWeight: 200g\nDimensions: 50x60cm`}
                                value={form.specifications}
                                onChange={handleChange}
                                rows={4}
                            />
                            <FormTextarea
                                label="Care Instructions"
                                name="careInstructions"
                                placeholder={`Hand wash in cold water\nLay flat to dry\nDo not bleach`}
                                value={form.careInstructions}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>
                    </SectionCard>

                    {/* Images */}
                    <SectionCard title="Product Images" icon={Image}>
                        <FormTextarea
                            label="Image URLs"
                            name="images"
                            placeholder={`https://example.com/image1.jpg,\nhttps://example.com/image2.jpg`}
                            value={form.images}
                            onChange={handleChange}
                            rows={3}
                        />
                        <p className="text-sm text-gray-500">
                            Enter image URLs separated by commas. The first image will be used as the main product image.
                        </p>
                    </SectionCard>

                    {/* Product Status */}
                    <SectionCard title="Product Status" icon={Settings}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormCheckbox
                                name="inStock"
                                label="In Stock"
                                checked={form.inStock}
                                onChange={handleChange}
                                description="Product is available for purchase"
                            />
                            <FormCheckbox
                                name="isNew"
                                label="New Product"
                                checked={form.isNew}
                                onChange={handleChange}
                                description="Show 'New' badge on product"
                            />
                            <FormCheckbox
                                name="isSale"
                                label="On Sale"
                                checked={form.isSale}
                                onChange={handleChange}
                                description="Show sale pricing and badge"
                            />
                        </div>
                    </SectionCard>

                    {/* Message Display */}
                    {message && (
                        <AlertMessage type={message.type} message={message.text} />
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/dashboard')}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
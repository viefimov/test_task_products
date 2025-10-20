import React, { useState } from "react";
import { type Product } from "../api/productsApi";
import { useAppDispatch } from "../hooks";
import { editProduct, removeProduct } from "./productsSlice";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  const handleSave = async () => {
    await dispatch(editProduct({ id: product.id, data: { title, price } }));
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(removeProduct(product.id));
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-52 object-contain"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Title</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Price</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <p className="text-gray-600">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-gray-600">
            <strong>Rating:</strong> {product.rating.rate} (
            {product.rating.count})
          </p>
          <p className="text-gray-700">{product.description}</p>

          <div className="flex justify-end gap-3 mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

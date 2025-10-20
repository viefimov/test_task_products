import React, { useState } from "react";
import { useAppDispatch } from "../hooks";
import { createProduct } from "./productsSlice";

interface Props {
  onClose: () => void;
}

const AddProductModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    if (!title || !price || !category) {
      alert("Please fill title, price, and category");
      return;
    }

    await dispatch(
      createProduct({
        title,
        price: Number(price),
        description,
        image,
        category,
        rating: { rate: 0, count: 0 },
      })
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden p-6 animate-fadeIn relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-2"
            onClick={handleAdd}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

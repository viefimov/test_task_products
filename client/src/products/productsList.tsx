import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { loadProducts } from "./productsSlice";
import ProductCard from "./productCard";
import AddProductModal from "./addProductModal";

const ProductsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const [sort, setSort] = useState<"price" | "rating">("price");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price")
      return order === "asc" ? a.price - b.price : b.price - a.price;
    else
      return order === "asc"
        ? a.rating.rate - b.rating.rate
        : b.rating.rate - a.rating.rate;
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-4 mb-4">
        {/* Левая часть: сортировка */}
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setSort("price")}
          >
            Sort by Price
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setSort("rating")}
          >
            Sort by Rating
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          >
            Toggle Order
          </button>
        </div>

        {/* Правая часть: кнопка Add Product */}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setShowAddModal(true)}
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default ProductsList;

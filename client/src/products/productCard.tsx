import React, { useState } from "react";
import { type Product } from "../api/productsApi";
import ProductModal from "./productModal";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
        onClick={() => setOpen(true)}
      >
        <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h2 className="font-semibold text-lg line-clamp-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500">{product.category}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold">${product.price}</span>
            <span className="text-sm text-yellow-500 font-semibold">
              ⭐ {product.rating.rate}
            </span>
          </div>
        </div>
      </div>

      {open && (
        <ProductModal product={product} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default ProductCard;

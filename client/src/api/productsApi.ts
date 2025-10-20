export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}
const link = "http://localhost:3001/api/products";
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${link}`);
  return res.json();
};


export const addProduct = async (product: Omit<Product, "id">) => {
  const res = await fetch(`${link}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (id: number, data: Partial<Product>) => {
  const res = await fetch(`${link}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${link}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

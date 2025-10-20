import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  type Product,
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/productsApi";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
};

export const loadProducts = createAsyncThunk("products/load", async () => {
  return await fetchProducts();
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (product: Omit<Product, "id">) => {
    return await addProduct(product);
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, data }: { id: number; data: Partial<Product> }) => {
    return await updateProduct(id, data);
  }
);

export const removeProduct = createAsyncThunk(
  "products/remove",
  async (id: number) => {
    await deleteProduct(id); 
    return id; 
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
          state.status = "idle";
        }
      )
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(
        editProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.items.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) state.items[index] = action.payload;
        }
      )
      .addCase(
        removeProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter((p) => p.id !== action.payload);
        }
      );
  },
});

export default productsSlice.reducer;

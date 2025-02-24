import { createSlice } from '@reduxjs/toolkit';

// Initialize cart from localStorage
const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: savedCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        // Nếu tồn tại, tăng số lượng
        existingItem.quantity += quantity;
        console.log(`Increased quantity for product ID: ${item.id}`);
      } else {
        // Nếu không tồn tại, thêm sản phẩm mới
        state.items.push({ ...item, quantity });
        console.log(`Added new product with ID: ${item.id}`);
      }

      // Cập nhật giỏ hàng trong localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(cartItem => cartItem.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(cartItem => cartItem.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(cartItem => cartItem.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearProduct: state => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeProduct, clearProduct } =
  cartSlice.actions;

export default cartSlice;

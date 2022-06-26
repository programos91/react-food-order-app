import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (itemId) => {},
  clearCart: () => {}
});

export default CartContext;

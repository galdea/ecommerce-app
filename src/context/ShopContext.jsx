import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId, size) => {
    // Create a deep copy of the current cart
    const cartData = JSON.parse(JSON.stringify(cartItems));

    // If the item doesn't exist in the cart, create an entry
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // If the size doesn't exist for this item, set it to 1, otherwise increment
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    // Update the cart
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    // Iterate through items in the cart
    Object.keys(cartItems).forEach((itemId) => {
      // Iterate through sizes for each item
      Object.keys(cartItems[itemId]).forEach((size) => {
        // Add the quantity of each size
        totalCount += cartItems[itemId][size];
      });
    });

    return totalCount;
  };

  const removeFromCart = (itemId, size) => {
    const cartData = JSON.parse(JSON.stringify(cartItems));

    // If the item and size exist in the cart
    if (cartData[itemId] && cartData[itemId][size]) {
      // Decrease quantity
      cartData[itemId][size] -= 1;

      // If quantity becomes 0, remove the size entry
      if (cartData[itemId][size] === 0) {
        delete cartData[itemId][size];
      }

      // If no sizes left for the item, remove the item
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      // Update the cart
      setCartItems(cartData);
    }
  };

  // Optional: Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage', error);
    }
  }, [cartItems]);

  // Optional: Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
    }
  }, []);

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = (async) => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

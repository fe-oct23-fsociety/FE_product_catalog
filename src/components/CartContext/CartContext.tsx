import React, { useMemo, useState, useEffect } from 'react';

export const CartContext = React.createContext({
  cartCount: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCartCount: (newCount: number) => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = localStorage.getItem('cartCount');

    return savedCount !== null ? JSON.parse(savedCount) : 0;
  });

  const cartState = useMemo(() => ({
    cartCount,
    setCartCount,
  }), [cartCount]);

  useEffect(() => {
    localStorage.setItem('cartCount', JSON.stringify(cartCount));
  }, [cartCount]);

  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
};

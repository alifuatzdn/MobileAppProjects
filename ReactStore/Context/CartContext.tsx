import { CartResponse, getBasket } from "@/Services/cartService";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type BasketContextType = {
  basket: CartResponse[];
  basketCount: number;
  refreshBasket: () => void;
};

const BasketContext = createContext<BasketContextType>({
  basket: [],
  basketCount: 0,
  refreshBasket: () => { },
});

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<CartResponse[]>([]);
  const basketCount = basket.length;

  const refreshBasket = async () => {
    try {
      const basketResponse = await getBasket();
      setBasket(basketResponse);
    } catch {
      setBasket([]);
    }
  };

  useEffect(() => {
    refreshBasket();
  }, []);

  return (
    <BasketContext.Provider value={{ basket, basketCount, refreshBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
import { useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart, clearCart } from "../states/cart/cartSlice";

interface CartItemTypes {
  Item: {
    name: string;
    price: number;
    image: string;
  };
  itemId: string;
}

export default function useCart() {
  const dispatch = useDispatch();

  function onFetchCartSuccess(data: CartItemTypes[]) {
    dispatch(clearCart());
    data.map((item: CartItemTypes) => {
      dispatch(
        addToCart({
          id: item.itemId,
          name: item.Item.name,
          price: item.Item.price,
          quantity: 1,
        })
      );
    });
  }

  const fetchCart = useMemo(
    () => async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/cart/getItems`;
      const { data } = await axios.get(url, { withCredentials: true });
      onFetchCartSuccess(data as CartItemTypes[]);
      return data as CartItemTypes[];
    },
    []
  );

  const { refetch: fetchCartData, isLoading: isFetchingCart } = useQuery({
    queryKey: ["cart-query"],
    queryFn: fetchCart,
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { fetchCartData, isFetchingCart };
}

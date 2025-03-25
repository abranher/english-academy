import { Course } from "@/types/models/Course";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (course: Course) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (course: Course) => {
        const { cart } = get();

        // Comprobamos si el curso ya está en el carrito
        const isCourseInCart = cart.some((item) => item.id === course.id);

        // Si el curso no está en el carrito, lo agregamos con cantidad 1
        if (!isCourseInCart) {
          set({ cart: [...cart, { ...course }] });
        }
      },

      removeFromCart: (course: Course) => {
        const { cart } = get();

        set({ cart: cart.filter((item) => item.id !== course.id) });
      },

      clearCart: () => {
        set({
          cart: [],
          total: 0,
        });
      },
    }),
    {
      name: "courses",
    }
  )
);

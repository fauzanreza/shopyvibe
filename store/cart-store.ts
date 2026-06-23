import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem?: (id: string) => void; // Optional for future use
    clearCart?: () => void; // Optional for future use
    updateItemQuantity?: (id: string, quantity: number) => void; // Optional for future use
    getTotalPrice?: () => number; // Optional for future use
    getItemCount?: () => number; // Optional for future use
    getItems?: () => CartItem[]; // Optional for future use
    isEmpty?: () => boolean; // Optional for future use
    hasItem?: (id: string) => boolean; // Optional for future use
    getItem?: (id: string) => CartItem | undefined; // Optional for future use
    getItemQuantity?: (id: string) => number; // Optional for future use
    getTotalItems?: () => number; // Optional for future use
    getTotalUniqueItems?: () => number; // Optional for future use
    getCartSummary?: () => { totalPrice: number; itemCount: number }; // Optional for future use
    getCartDetails?: () => { items: CartItem[]; totalPrice: number; itemCount: number }; // Optional for future use
    getCartState?: () => CartStore; // Optional for future use
    setCartState?: (state: CartStore) => void; // Optional for future use
    resetCart?: () => void; // Optional for future use
    hydrate?: () => void; // Optional for future use
    persist?: () => void; // Optional for future use
    rehydrate?: () => void; // Optional for future use
    subscribe?: (listener: (state: CartStore) => void) => () => void; // Optional for future use
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item: CartItem) => set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id);
                if (existingItem) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    };
                }
                return { items: [...state.items, item] };
            }),

            removeItem: (id) => set((state) => {
                return { items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0) };
            }),
            clearCart: () =>
                set(() => {
                   return {items: []};
                }),
         }),
        {
            name: 'cart-storage',
        }
    )
);
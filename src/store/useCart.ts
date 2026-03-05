import { create } from 'zustand';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Omit<CartItem, 'quantity' | 'id'> & { id?: string }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
    items: [],
    addItem: (product) => set((state) => {
        // Generate an ID based on name if not provided (useful since current static products lack IDs)
        const productId = product.id || product.name.replace(/\s+/g, '-').toLowerCase();

        const existingItem = state.items.find(item => item.id === productId);

        if (existingItem) {
            return {
                items: state.items.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        }

        return {
            items: [...state.items, { ...product, id: productId, quantity: 1 }]
        };
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),
    updateQuantity: (id, quantity) => set((state) => ({
        items: quantity > 0
            ? state.items.map(item => item.id === id ? { ...item, quantity } : item)
            : state.items.filter(item => item.id !== id) // Remove if quantity becomes 0
    })),
    clearCart: () => set({ items: [] }),
    getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    }
}));

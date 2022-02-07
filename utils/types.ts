import {  Dispatch, SetStateAction } from "react"

import {
    Filter,
    Set,
    Card,
    CartItem
} from "./models"

export type HomeProps = {
    types: string[],
    rarities: string[],
    sets: Set[],
    cards: Card[]
}

export type FilterBoxProps = {
    types: string[],
    rarities: string[],
    sets: string[],
    filters: Filter,
    setFilters: Dispatch<SetStateAction<Filter>>
}

export type DropdownMenuProps = {
    defaultLabel: string,
    options: string[],
    value: string | null,
    handleChange: (value: string | null) => void,
}

export type ProductCardProps = {
    card: Card,
    cartItems: CartItem[]
    handleAddToCart: (card: Card) => any,
}

export type CartItemProps = {
    id: string,
    name: string,
    price: number,
    totalCount: number,
    count: number,
    image: string,
    clearAllInCart: () => any,
    handleIncreaseInCart: (cardId: string) => any,
    handleDecreaseInCart: (cardId: string) => any,
}

export type ShoppingCartProps = {
    cartItems: CartItem[],
    clearAllInCart: () => any,
    handleIncreaseInCart: (cardId: string) => any,
    handleDecreaseInCart: (cardId: string) => any,
}
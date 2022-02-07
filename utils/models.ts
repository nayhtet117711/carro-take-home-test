
export interface Set {
    id: string,
    name: string,
    total: number,
}
export interface Card {
    id: string,
    name: string,
    supertype: string,
    subtypes: string[],
    types: string[],
    set: Set,
    rarity: string,
    images: {
        small: string,
        large: string
    },
    cardmarket: {
        url: string,
        prices: {
            averageSellPrice: number
        }
    }
}

export interface CartItem {
    id: string,
    name: string,
    price: number,
    totalCount: number,
    count: number,
    image: string,
}

export interface TypeResp {
    data: string[]
}
export interface RarityResp {
    data: string[]
}
export interface SetResp {
    data: Set[]
}
export interface CardResp {
    data: Card[]
}

export interface Filter {
    name: string | null,
    type: string | null,
    rarity: string | null,
    set: string | null
}

export interface CardQuery {
    page: number,
    pageSize: number,
    name?: string | null,
    type?: string | null,
    rarity?: string | null,
    set?: string | null,
}


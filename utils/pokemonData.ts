import { 
    Set,
    Card,
    TypeResp, 
    RarityResp,
    SetResp,
    CardResp,
    CardQuery
} from "./models"

export const pokemonApi = {
    base: "https://api.pokemontcg.io/v2",
    type: "/types",
    rarity: "/rarities",
    set: "/sets",
    card: "/cards",
}

export const fetchTypes = (): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
        fetch(pokemonApi.base+pokemonApi.type)
            .then(res => res.json())
            .then((data: TypeResp) => resolve(data.data))
            .catch(e => reject(e))
    })
}

export const fetchRarities = (): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
        fetch(pokemonApi.base+pokemonApi.rarity)
            .then(res => res.json())
            .then((data: RarityResp) => resolve(data.data))
            .catch(e => reject(e))
    })
}

export const fetchSets = (): Promise<Set[]> => {
    return new Promise<Set[]>((resolve, reject) => {
        fetch(pokemonApi.base+pokemonApi.set)
            .then(res => res.json())
            .then((data: SetResp) => resolve(data.data))
            .catch(e => reject(e))
    })
}

export const fetchCards = (query: CardQuery): Promise<Card[]> => {
    const page = query.page
    const pageSize = query.pageSize
    const q = [
        (query.name ? `name:"${query.name}*"` : ""),
        (query.type ? `types:"${query.type}"` : ""),
        (query.rarity ? `rarity:"${query.rarity}"` : ""),
        (query.set ? `set.name:"${query.set}"` : "")
    ]
    .filter(v => v!=="")
    .join(" ")
    const queryParams = `?page=${page}&pageSize=${pageSize}&q=${q}`
    // console.log("queryParams: ", {query, queryParams})
    return new Promise<Card[]>((resolve, reject) => {
        fetch(pokemonApi.base+pokemonApi.card+queryParams)
            .then(res => res.json())
            .then((data: CardResp) => resolve(data.data))
            .catch(e => reject(e))
    })
}
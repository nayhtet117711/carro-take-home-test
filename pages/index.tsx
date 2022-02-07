import type { NextPage, NextPageContext } from 'next'
import FilterBox from '../components/FilterBox'
import ProductCard from '../components/ProductCard'
import ShoppingCart from '../components/ShoppingCart'

import { 
  fetchTypes, 
  fetchRarities, 
  fetchSets,
  fetchCards
} from "../utils/pokemonData"

import { 
  Filter,
  Card,
  CartItem
} from "../utils/models"

import {
  HomeProps
} from "../utils/types"

import styles from '../styles/Home.module.scss'
import { useEffect, useState } from 'react'

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const [filters, setFilters] = useState<Filter>({ name: "", type: null, rarity: null, set: null })
  const [cards, setCards] = useState<Card[]>(props.cards);
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [pageNo, setPageNo] = useState(1)
  const [moreLoading, setMoreLoading] = useState(false)

  useEffect(() => {
    if(filters.name==="" && filters.type===null && filters.rarity===null && filters.set===null) return;
    fetchCards({ page: 1, pageSize: 12, ...filters })
      .then(cards => setCards(cards))
    return () => {}
  }, [filters])

  useEffect(() => {
    if(pageNo===1) return;
    setMoreLoading(true)
    fetchCards({ page: pageNo, pageSize: 12, ...filters })
      .then(addedCards => {
        setCards([...cards, ...addedCards])
        setMoreLoading(false)
      })
    return () => {}
  }, [pageNo])

  const handleIncreaseInCart = (cardId: String) => {
    const cartItemIndex = cartItems.findIndex(card => card.id===cardId)
    if(cartItemIndex===-1) return; 
    const newCartItems = [...cartItems]
    newCartItems[cartItemIndex].count += 1
    setCartItems(newCartItems) 
  }

  const handleDecreaseInCart = (cardId: String) => {
    const cartItemIndex = cartItems.findIndex(card => card.id===cardId)
    if(cartItemIndex===-1) return; 
    const newCartItems = [...cartItems]
    if(newCartItems[cartItemIndex].count===1) {
      newCartItems.splice(cartItemIndex, 1)
      setCartItems(newCartItems) 
      return;
    }
    newCartItems[cartItemIndex].count -= 1
    setCartItems(newCartItems) 
  }

  const handleAddToCart = (card: Card) => {
    const cartItemIndex = cartItems.findIndex(c => c.id===card.id)
    if(cartItemIndex>-1) return handleIncreaseInCart(card.id)
  
    const cartItem: CartItem = {
      id: card.id,
      name: card.name,
      price: card.cardmarket.prices.averageSellPrice,
      totalCount: card.set.total,
      image: card.images.small,
      count: 1
    }
    setCartItems([...cartItems, cartItem])
  }

  const clearAllInCart = (): void => {
    setCartItems([])
  }

  const cardList = cards.map((card) => (
    <ProductCard 
      key={card.id} 
      card={card} 
      cartItems={cartItems}
      handleAddToCart={handleAddToCart} 
    />
  ))

  return (
    <div className={styles.container}>
      <FilterBox 
        types={props.types}
        rarities={props.rarities}
        sets={props.sets.map(s => s.name)}
        filters={filters}
        setFilters={setFilters}
      />
      <div className={styles.cardContainer}>
        { cardList }
        <div className={styles.showmoreButton} onClick={() => { !moreLoading ? setPageNo(pageNo+1) : null }}>
          <span className={`material-icons ${styles.icon}`}>search</span>
          <span>{ !moreLoading ? "see more" : "loading..."}</span>
        </div>
      </div>
      <div className={styles.homeFooter}>
        <ShoppingCart 
          cartItems={cartItems}
          clearAllInCart={clearAllInCart}
          handleIncreaseInCart={handleIncreaseInCart}
          handleDecreaseInCart={handleDecreaseInCart}
        />
        <div className={styles.gradientFooterMask}></div>
      </div>
    </div>
  )
}

export async function getStaticProps(context: NextPageContext) {
  try {
    const types = await fetchTypes()
    const rarities = await fetchRarities()
    const sets = await fetchSets()
    const cards = await fetchCards({ page: 1, pageSize: 12 })
    return {
      props: { 
        types, 
        rarities,
        sets,
        cards
      }
    }
  } catch(e) {
    return {
      types: [],
      rarities: [],
      sets: [],
      cards: [],
    }
  }
}

export default Home

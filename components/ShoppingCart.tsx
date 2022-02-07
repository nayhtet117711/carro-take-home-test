import Image from "next/image";
import styles from "../styles/ShoppingCart.module.scss"

import {
    CartItemProps, 
    ShoppingCartProps
} from "../utils/types"
import { useEffect, useState } from "react";

const CartItem = (props: CartItemProps): JSX.Element => {
    const cardLeft = props.totalCount - props.count
    const totalPrice = (props.count * props.price).toFixed(2)
    
    return (
        <div className={styles.cartItem}>
            <div className={styles.image}>
                <Image
                    src={props.image}
                    alt={props.name}
                    layout="fill"
                    objectFit="scale-down"
                />
            </div>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.price}>${props.price} <span>per card</span></div>
            <div className={styles.left}>{cardLeft} <span>cards left</span></div>
            <div className={styles.itemCount}>
                <div className={styles.value}>{props.count}</div>
                <div className={styles.control}>
                    <div 
                        onClick={() => cardLeft>0 ? props.handleIncreaseInCart(props.id) : null}
                        className={`material-icons ${styles.increase} ${cardLeft<=0 ? styles.disabled : ''}`}>expand_less</div>
                    {props.count>1 &&
                    <div 
                        onClick={() => props.handleDecreaseInCart(props.id)}
                        className={`material-icons ${styles.decrease}`}>expand_more</div>}
                    {props.count<=1 && 
                    <div 
                        onClick={() => props.clearAllInCart()}
                        className={`material-icons ${styles.remove}`}>close</div>}
                </div>
            </div>
            <div className={styles.totalCostLabel}>price</div>
            <div className={styles.totalCost}>${totalPrice}</div>
        </div>
    )
}

const ShoppingCart = (props: ShoppingCartProps): JSX.Element => {
    const [cartVisible, setCartVisible] = useState(false)
    const [paymentSuccessVisible, setPaymentSuccessVisible] = useState(false)

    useEffect(() => {
        if(props.cartItems.length===0)
            setCartVisible(false)
        return () => {}
    }, [props.cartItems])

    const cartItemList = props.cartItems.map(cItem => (
        <CartItem
            key={cItem.id}
            { ...cItem }
            handleIncreaseInCart={props.handleIncreaseInCart}
            handleDecreaseInCart={props.handleDecreaseInCart}
            clearAllInCart={props.clearAllInCart}
        />  
    ))

    const totalCountInCart = props.cartItems.map(card => card.count).reduce((r,c) => r+c, 0)
    const totalPriceInCart = props.cartItems.map(card => card.count * card.price).reduce((r,c) => r+c, 0).toFixed(2)
    return (
        <div className={styles.shoppingCartContainer}>
            <div className={styles.cartContentContainer} data-visible={cartVisible || undefined}>
                <div className={styles.cartItems}>
                    { cartItemList }
                </div>
                <div className={styles.summaryContainer}>
                    <div className={styles.summary}>
                        <div className={styles.totalCard}>
                            <div className={styles.label}>Total cards</div>
                            <div className={styles.value}>{totalCountInCart}</div>
                        </div>
                        <div className={styles.totalPrice}>
                            <div className={styles.label}>Total price</div>
                            <div className={styles.value}>${totalPriceInCart}</div>
                        </div>
                        <div className={styles.paynowButton} onClick={()=>{ props.clearAllInCart(); setPaymentSuccessVisible(true) }}>Pay now</div>
                    </div>
                    <div className={styles.gradientMask} onClick={() => props.clearAllInCart()}>
                        <div className={styles.clearButton}>Clear all</div>
                    </div>
                </div>
            </div>
            { totalCountInCart>0 && 
            (cartVisible 
                ? <div className={styles.closeCartButton} onClick={e => setCartVisible(false)}>
                    <span className={`material-icons ${styles.icon}`}>close</span>
                </div>
                : <div className={styles.viewCartButton} data-badge={totalCountInCart ? totalCountInCart: ""} onClick={e => setCartVisible(true)}>
                    <span className={`material-icons ${styles.icon}`}>shopping_cart</span>
                    <span>View Cart</span>
                </div>)
            }
            {paymentSuccessVisible &&
            <div className={styles.paymentSuccessContainer}>
                <div className={`material-icons ${styles.icon}`}>check_circle</div>
                <div className={styles.text}>
                    Payment success!
                </div>
            </div>}
            {paymentSuccessVisible &&
            <div className={styles.closeCartButton} onClick={e => setPaymentSuccessVisible(false)}>
                <span className={`material-icons ${styles.icon}`}>close</span>
            </div>
            }
            
        </div>
    )
}

export default ShoppingCart
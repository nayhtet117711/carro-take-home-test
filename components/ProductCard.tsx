import Image from "next/image";
import styles from "../styles/ProductCard.module.scss"

import {
    ProductCardProps
} from "../utils/types"

const PCard = (props: ProductCardProps): JSX.Element => {
    const card = props.card
    const cartItems = props.cartItems
    const handleAddToCart = props.handleAddToCart
    
    const isInCart = cartItems.find(c => c.id===card.id)

    return (
        <div className={styles.productCardContainer}>
            <div className={styles.cardBackground}>
                <div className={styles.cardInfo}>
                    <div className={styles.title}>{card.name}</div>
                    <div className={styles.rarity}>{card.rarity}</div>
                    <div className={`${styles.setInfo} ${styles.start}`}>${card.cardmarket.prices.averageSellPrice}</div>
                    <div className={styles.setInfo}>{card.set.total} left</div>
                </div>
                <div 
                    className={styles.selectCardButton} 
                    data-selected={isInCart ? 'yes' : undefined}
                    onClick={() => handleAddToCart(card)}>
                        { isInCart ? "Selected" : "Select card"}
                </div>
            </div>
            <div className={styles.imageContiner}>
                <Image
                    src={card.images.small}
                    alt={card.id}
                    layout="fill"
                    quality={100}
                    objectFit="scale-down"
                    blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    placeholder="blur"
                />
            </div>
        </div>
    )
}

export default PCard
import styles from "../styles/PageHeader.module.scss"

const PageHeader = (): JSX.Element => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.title}>TCG Marketplace</div>
            <div className={styles.logoContainer}>
                <div></div>
                <img 
                    className={styles.logo}
                    src="/pokemon-logo.png"
                    alt="TCG Logo"
                />
                <img 
                    className={styles.logoText}
                    src="/pokemon-text-logo.png"
                    alt="TCG Logo"
                />
            </div>
        </div>
    )
}

export default PageHeader
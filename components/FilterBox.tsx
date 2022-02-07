import styles from "../styles/FilterBox.module.scss"
import {
    DropdownMenuProps,
    FilterBoxProps
} from "../utils/types"

const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {
    const defaultOption ="All"
    const viewOptions = (props.options.length ? [defaultOption, ...props.options] : props.options).map((v, i) => (
        <div 
            key={i} 
            className={styles.option} 
            onClick={(e) => {
                const dd = e.currentTarget.parentElement
                if(dd) {
                    dd.classList.add(styles.hide)
                    const tm = setTimeout(() => {
                        dd.classList.remove(styles.hide)
                        clearTimeout(tm)
                    }, 300);
                }
                props.handleChange(v===defaultOption ? null : v)
            }}>
            {v}
        </div>
    ))
    return (
        <div className={styles.menu}>
            <div className={styles.menuItem} title={ props.value ? props.value : props.defaultLabel }>
                <div>{ props.value ? props.value : props.defaultLabel }</div>
                <div className={`material-icons ${styles.icon}`}>expand_more</div>
            </div>
            <div className={styles.dropdown}>
                { viewOptions }
            </div>
        </div>
    )
}

const FilterBox = (props: FilterBoxProps): JSX.Element => {

    return (
        <div className={styles.filterContainer}>
            <div className={styles.search}>
                <input 
                    type="text"
                    placeholder="Name..."
                    onChange={e => props.setFilters({ ...props.filters, name: e.target.value || null })}
                />                    
            </div>
            <DropdownMenu 
                defaultLabel="Type"
                options={props.types}
                value={props.filters.type}
                handleChange={value => props.setFilters({ ...props.filters, type: value, name: props.filters.name || null })}
            />
            <DropdownMenu 
                defaultLabel="Rarity"
                options={props.rarities}
                value={props.filters.rarity}
                handleChange={value => props.setFilters({ ...props.filters, rarity: value, name: props.filters.name || null })}
            />
            <DropdownMenu 
                defaultLabel="Set"
                options={props.sets}
                value={props.filters.set}
                handleChange={value => props.setFilters({ ...props.filters, set: value, name: props.filters.name || null })}
            />
        </div>
    )
}

export default FilterBox
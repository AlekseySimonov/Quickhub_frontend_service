import {icons} from '../../../../shared/ui/icons/header'
export const Search = ({styles, placeholder})=>{
    return(
        <>
        <div className={styles.search}>
            <img className={styles.search_icon} src={icons.search}/>
            <input type="text" placeholder={placeholder} />
        </div>
    </>
    )
}

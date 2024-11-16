import {icons} from '../../../../shared/ui/icons/header'
import styles from './search.module.css'
export const Search = ({ testid, placeholder})=>{
    return(
        <>
        <div data-testid={testid} className={styles.search}>
            <img className={styles.search_icon} src={icons.search}/>
            <input type="text" placeholder={placeholder} />
        </div>
    </>
    )
}
